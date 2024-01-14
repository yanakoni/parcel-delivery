import { Box, Button, Grid, Modal, TextField, Typography, Accordion, AccordionDetails, AccordionSummary, } from '@mui/material';
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
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';

type PostOfficeForm = {
  id: string | null;
  name: string;
  workingHours: string;
  contactNumber: string;
  servicesOffered: string;
  address: {
    country: string,
    city: string,
    street: string,
    zipCode: string,
  };
};

const initialErrors: any = {
  name: '',
  workingHours: '',
  contactNumber: '',
  servicesOffered: '',
  address: {
    country: '',
    city: '',
    street: '',
    zipCode: '',
  },
};

const initialValues: PostOfficeForm = {
  id: null,
  name: '',
  workingHours: '',
  contactNumber: '',
  servicesOffered: '',
  address: {
    country: '',
    city: '',
    street: '',
    zipCode: '',
  }
};

const PostOfficeSchema = object({
  id: string().nullable().optional(),
  name: string().nonempty('Name is required'),
  workingHours: string().nonempty('Working Hours is required'),
  contactNumber: string().nonempty('Contact Number is required'),
  servicesOffered: string().nonempty('Services Offered is required'),
  address: object({
    country: string().nonempty('Country is required'),
    city: string().nonempty('City is required'),
    street: string().nonempty('Street is required'),
    zipCode: string().nonempty('ZipCode is required'),
  })
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
    field: 'workingHours',
    headerName: 'Working Hours',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'contactNumber',
    headerName: 'Contact Number',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'servicesOffered',
    headerName: 'Services Offered',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'address',
    headerName: 'Address',
    flex: 2,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => {
      return <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>
          {`${params.row.address.street}, ${params.row.address.city}, ${params.row.address.country}, ${params.row.address.zipCode}`}
        </Typography>
      </Grid>
    </Grid>;
    },
  },
  {
    field: 'delete',
    headerName: '',
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params: any) => {
      return <Button onClick={() => onDelete(params.row.id)}>Delete</Button>;
    },
  },
  {
    field: 'edit',
    headerName: '',
    flex: 0.5,
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
          workingHours: formData.get('workingHours') as string,
          contactNumber: formData.get('contactNumber') as string,
          servicesOffered: formData.get('servicesOffered') as string,
          address: {
            country: formData.get('address.country') as string,
            city: formData.get('address.city') as string,
            street: formData.get('address.street') as string,
            zipCode: formData.get('address.zipCode') as string,
          }
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
          workingHours: formData.get('workingHours') as string,
          contactNumber: formData.get('contactNumber') as string,
          servicesOffered: formData.get('servicesOffered') as string,
          address: {
            country: formData.get('address.country') as string,
            city: formData.get('address.city') as string,
            street: formData.get('address.street') as string,
            zipCode: formData.get('address.zipCode') as string,
          }
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
                    id="contactNumber"
                    name="contactNumber"
                    label="Contact Number"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedPostOffice?.contactNumber}
                    helperText={errors.contactNumber}
                    error={!!errors.contactNumber}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="workingHours"
                    name="workingHours"
                    label="Working Hours"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedPostOffice?.workingHours}
                    helperText={errors.workingHours}
                    error={!!errors.workingHours}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="servicesOffered"
                    name="servicesOffered"
                    label="Services Offered"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedPostOffice?.servicesOffered}
                    helperText={errors.servicesOffered}
                    error={!!errors.servicesOffered}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                <Accordion key={'post-office-create'} expanded={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`bh-content`}
                    id={`bh-header`}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 12 }}>{'Address'}</Typography>
                  </AccordionSummary>
                <AccordionDetails>
                  <Grid item>
                    <TextField
                      id="country"
                      name="address.country"
                      label="Country"
                      type="text"
                      autoComplete="off"
                      defaultValue={editedPostOffice?.address.country}
                      helperText={errors.address.country}
                      error={!!errors.address.country}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="city"
                      name="address.city"
                      label="City"
                      type="text"
                      autoComplete="off"
                      defaultValue={editedPostOffice?.address.city}
                      helperText={errors.address.city}
                      error={!!errors.address.city}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="street"
                      name="address.street"
                      label="Street"
                      type="text"
                      autoComplete="off"
                      defaultValue={editedPostOffice?.address.street}
                      helperText={errors.address.street}
                      error={!!errors.address.street}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="zipCode"
                      name="address.zipCode"
                      label="Zip Code"
                      type="text"
                      autoComplete="off"
                      defaultValue={editedPostOffice?.address.zipCode}
                      helperText={errors.address.zipCode}
                      error={!!errors.address.zipCode}
                      fullWidth
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
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
                    id="contactNumber"
                    name="contactNumber"
                    label="Contact Number"
                    type="text"
                    autoComplete="off"
                    helperText={errors.contactNumber}
                    error={!!errors.contactNumber}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="workingHours"
                    name="workingHours"
                    label="Working Hours"
                    type="text"
                    autoComplete="off"
                    helperText={errors.workingHours}
                    error={!!errors.workingHours}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="servicesOffered"
                    name="servicesOffered"
                    label="Services Offered"
                    type="text"
                    autoComplete="off"
                    helperText={errors.servicesOffered}
                    error={!!errors.servicesOffered}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                <Accordion key={'post-office-create'} expanded={true}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`bh-content`}
                    id={`bh-header`}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 12 }}>{'Address'}</Typography>
                  </AccordionSummary>
                <AccordionDetails>
                  <Grid item>
                    <TextField
                      id="country"
                      name="address.country"
                      label="Country"
                      type="text"
                      autoComplete="off"
                      helperText={errors.address.country}
                      error={!!errors.address.country}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="city"
                      name="address.city"
                      label="City"
                      type="text"
                      autoComplete="off"
                      helperText={errors.address.city}
                      error={!!errors.address.city}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="street"
                      name="address.street"
                      label="Street"
                      type="text"
                      autoComplete="off"
                      helperText={errors.address.street}
                      error={!!errors.address.street}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="zipCode"
                      name="address.zipCode"
                      label="Zip Code"
                      type="text"
                      autoComplete="off"
                      helperText={errors.address.zipCode}
                      error={!!errors.address.zipCode}
                      fullWidth
                    />
                  </Grid>
                </AccordionDetails>
              </Accordion>
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
