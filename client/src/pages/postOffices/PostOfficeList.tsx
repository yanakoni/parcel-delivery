import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { styles } from '../dashboard/styles';
import { CustomNoRowsOverlay } from '../../components';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { number, object, string, TypeOf } from 'zod';
import { showNotification } from '../../utils';
import { hasErrorMessage, isApiError, isZodError } from '../../guards';
import { LoadingButton } from '@mui/lab';

type PostOfficeForm = {
  id: string | null;
  name: string;
  type: string;
  manufacturer: string;
  capacity: number;
};

const initialErrors: any = {
  name: '',
  type: '',
  manufacturer: '',
  capacity: '',
};

const initialValues: PostOfficeForm = {
  id: null,
  name: '',
  type: '',
  manufacturer: '',
  capacity: 0,
};

const PostOfficeSchema = object({
  id: string().nullable().optional(),
  name: string().nonempty('Name is required'),
  type: string().nonempty('Type is required'),
  manufacturer: string().nonempty('Manufacturer is required'),
  capacity: number().min(0, 'Capacity must be greater than or equal to 0'),
});

type PostOfficeSchemaInput = TypeOf<typeof PostOfficeSchema>;

const columns = (onDelete: (id: string) => Promise<void>, onEdit: (id: string) => void): GridColDef<any>[] => [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'manufacturer',
    headerName: 'Manufacturer',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'capacity',
    headerName: 'Capacity',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'delete',
    headerName: '',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => {
      return <Button onClick={() => onDelete(params.row.id)}>Delete</Button>;
    },
  },
  {
    field: 'edit',
    headerName: '',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => {
      return <Button onClick={() => onEdit(params.row.id)}>Edit</Button>;
    },
  },
];

const PostOfficeList = () => {
  const [postOffices, setPostOffice] = useState<{
    values: PostOfficeForm[];
    meta: {
      page: number;
      pages: number;
      total: number;
      count: number;
    };
  }>({
    values: [],
    meta: {
      page: 0,
      pages: 0,
      total: 0,
      count: 0,
    },
  });
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editedPostOffice, setEditedPostOffice] = useState<PostOfficeSchemaInput>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const methods = useForm<PostOfficeSchemaInput>({
    resolver: zodResolver(PostOfficeSchema),
  });

  const fetchPostOffice = async () => {
    try {
      const response = await fetch('http://localhost:3000/postOffices');
      const data = await response.json();
      setPostOffice({
        values: data.data,
        meta: data.meta,
      });
    } catch (error) {
      console.error('Error fetching postOffices:', error);
      showNotification('Error fetching postOffices', 'error');
    }
  };

  useEffect(() => {
    fetchPostOffice();
  }, []); // Run only on mount

  const onDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/postOffices/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setPostOffice((prevPostOffice) => ({
          values: prevPostOffice.values.filter((postOffice) => postOffice.id !== id),
          meta: prevPostOffice.meta,
        }));
        showNotification('PostOffice successfully deleted', 'success');
      } else {
        showNotification('Failed to delete postOffice', 'error');
      }
    } catch (error) {
      console.error('Error deleting postOffice:', error);
      showNotification('Unexpected error', 'error');
    }
  };

  const onEditToggle = (id: string) => {
    setShowEdit(!showEdit);
    setEditedPostOffice(postOffices.values.find((postOffice) => postOffice.id === id) || initialValues);
  };

  const onCreateToggle = () => {
    setShowCreate(!showCreate);
  };

  const onEdit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setErrors(initialErrors);
        const formData = new FormData(event.currentTarget);

        const data = {
          id: editedPostOffice.id as string,
          name: formData.get('name') as string,
          type: formData.get('type') as string,
          manufacturer: formData.get('manufacturer') as string,
          capacity: parseInt(formData.get('capacity') as string),
        };

        const validatedData = PostOfficeSchema.parse(data);

        const response = await fetch(`http://localhost:3000/postOffices/${editedPostOffice.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        });

        if (response.ok) {
          setPostOffice({
            values: postOffices.values.map((postOffice) =>
              postOffice.id === editedPostOffice.id ? validatedData : postOffice,
            ) as PostOfficeForm[],
            meta: postOffices.meta,
          });
          setShowEdit(false);
          setEditedPostOffice(initialValues);
          showNotification('PostOffice successfully updated', 'success');
        } else {
          showNotification('Failed to update postOffice', 'error');
        }
      } catch (err) {
        if (isZodError(err)) {
          setErrors(
            err.issues.reduce((acc, error) => {
              return { ...acc, [error.path[0]]: error.message };
            }, {} as PostOfficeForm),
          );
        } else if (isApiError(err)) {
          const {
            data: { code, message },
          } = err;
          showNotification(`${code.toUpperCase()}: ${message}`, 'error');
        } else if (hasErrorMessage(err)) {
          console.error(err);
          showNotification(err.message, 'error');
        } else {
          console.error(err);
          showNotification('Unexpected error', 'error');
        }
      }
    },
    [postOffices, editedPostOffice],
  );

  const onCreate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      try {
        event.preventDefault();
        setErrors(initialErrors);
        const formData = new FormData(event.currentTarget);

        const data = {
          name: formData.get('name') as string,
          type: formData.get('type') as string,
          manufacturer: formData.get('manufacturer') as string,
          capacity: parseInt(formData.get('capacity') as string),
        };

        const validatedData = PostOfficeSchema.parse(data);

        const response = await fetch('http://localhost:3000/postOffices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        });

        const dataResponse = await response.json();

        if (response.ok) {
          setPostOffice({
            values: [...postOffices.values, dataResponse.data],
            meta: postOffices.meta,
          });
          setShowCreate(false);
          showNotification('PostOffice successfully added', 'success');
        } else {
          showNotification('Failed to add postOffice', 'error');
        }
      } catch (err) {
        if (isZodError(err)) {
          setErrors(
            err.issues.reduce((acc, error) => {
              return { ...acc, [error.path[0]]: error.message };
            }, {} as PostOfficeForm),
          );
        } else if (isApiError(err)) {
          const {
            data: { code, message },
          } = err;
          showNotification(`${code.toUpperCase()}: ${message}`, 'error');
        } else if (hasErrorMessage(err)) {
          console.error(err);
          showNotification(err.message, 'error');
        } else {
          console.error(err);
          showNotification('Unexpected error', 'error');
        }
      }
    },
    [postOffices],
  );

  return (
    <>
      <Typography variant="h4" sx={styles.tableHeading}>
        PostOffice List
      </Typography>
      <Button onClick={onCreateToggle}>Create new</Button>
      {postOffices && (
        <DataGrid
          loading={!postOffices.values.length}
          rows={postOffices.values}
          columns={columns(onDelete, onEditToggle)}
          pageSizeOptions={[5, 10, 20]}
          showCellVerticalBorder={false}
          getRowId={() => [...Array(12)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}
          slots={{
            noRowsOverlay: CustomNoRowsOverlay,
            noResultsOverlay: CustomNoRowsOverlay,
          }}
          classes={{ root: 'dashboardColumn' }}
          autoHeight
          disableRowSelectionOnClick
        />
      )}
      <Modal open={showEdit} onClose={() => setShowEdit(false)}>
        <div>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={onEdit} sx={styles.modalBox} mt={4} noValidate>
              <Typography variant="h6">Edit PostOffice</Typography>
              <Grid container spacing={4}>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedPostOffice?.name}
                    helperText={errors.name}
                    error={!!errors.name}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="type"
                    name="type"
                    label="Type"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedPostOffice?.type}
                    helperText={errors.type}
                    error={!!errors.type}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="manufacturer"
                    name="manufacturer"
                    label="Manufacturer"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedPostOffice?.manufacturer}
                    helperText={errors.manufacturer}
                    error={!!errors.manufacturer}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="capacity"
                    name="capacity"
                    label="Capacity"
                    type="number"
                    defaultValue={editedPostOffice?.capacity}
                    helperText={errors.capacity}
                    error={!!errors.capacity}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <LoadingButton type="submit" variant="contained" sx={styles.formButton}>
                Update
              </LoadingButton>
            </Box>
          </FormProvider>
        </div>
      </Modal>
      <Modal open={showCreate} onClose={() => setShowCreate(false)}>
        <div>
          <FormProvider {...methods}>
            <Box component="form" onSubmit={onCreate} sx={styles.modalBox} mt={4} noValidate>
              <Typography variant="h6">Create PostOffice</Typography>
              <Grid container spacing={4}>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    autoComplete="off"
                    helperText={errors.name}
                    error={!!errors.name}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="type"
                    name="type"
                    label="Type"
                    type="text"
                    autoComplete="off"
                    helperText={errors.type}
                    error={!!errors.type}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="manufacturer"
                    name="manufacturer"
                    label="Manufacturer"
                    type="text"
                    autoComplete="off"
                    helperText={errors.manufacturer}
                    error={!!errors.manufacturer}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="capacity"
                    name="capacity"
                    label="Capacity"
                    type="number"
                    helperText={errors.capacity}
                    error={!!errors.capacity}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <LoadingButton type="submit" variant="contained" sx={styles.formButton}>
                Create
              </LoadingButton>
            </Box>
          </FormProvider>
        </div>
      </Modal>
    </>
  );
};

export { PostOfficeList };
