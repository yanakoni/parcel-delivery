import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { styles } from '../dashboard/styles';
import { CustomNoRowsOverlay } from '../../components';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, number, TypeOf } from 'zod';
import { showNotification } from '../../utils';
import { hasErrorMessage, isApiError, isZodError } from '../../guards';
import { LoadingButton } from '@mui/lab';

type VehicleForm = {
  id: number | null;
  name: string;
  type: string;
  manufacturer: string;
  capacity: number;
};

const initialErrors: Omit<VehicleForm, 'id'> = {
  name: '',
  type: '',
  manufacturer: '',
  capacity: 0,
};

const initialValues: VehicleForm = {
  id: null,
  name: '',
  type: '',
  manufacturer: '',
  capacity: 0,
};

const VehicleSchema = object({
  id: number().nullable(),
  name: string().nonempty('Name is required'),
  type: string().nonempty('Type is required'),
  manufacturer: string().nonempty('Manufacturer is required'),
  capacity: number().min(0, 'Capacity must be greater than or equal to 0'),
});

type VehicleSchemaInput = TypeOf<typeof VehicleSchema>;

const columns = (onDelete: (id: number) => Promise<void>, onEdit: (id: number) => void): GridColDef<any>[] => [
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

const VehiclesList = () => {
  const [vehicles, setVehicles] = useState<{
    values: VehicleForm[];
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
  const [editedVehicle, setEditedVehicle] = useState<VehicleSchemaInput>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const methods = useForm<VehicleSchemaInput>({
    resolver: zodResolver(VehicleSchema),
  });

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/vehicles');
      const data = await response.json();
      setVehicles({
        values: data.data,
        meta: data.meta,
      });
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      showNotification('Error fetching vehicles', 'error');
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []); // Run only on mount

  const onDelete = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/vehicles/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {


 setVehicles((prevVehicles) => ({
          values: prevVehicles.values.filter((vehicle) => vehicle.id !== id),
          meta: prevVehicles.meta,
        }));
        showNotification('Vehicle successfully deleted', 'success');
      } else {
        showNotification('Failed to delete vehicle', 'error');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      showNotification('Unexpected error', 'error');
    }
  };

  const onEditToggle = (id: number) => {
    setShowEdit(!showEdit);
    setEditedVehicle(vehicles.values.find((vehicle) => vehicle.id === id) || initialValues);
  };

  const onCreateToggle = () => {
    setShowCreate(!showCreate);
  };

  const onEdit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setErrors(initialErrors);
      const formData = new FormData(event.currentTarget);

      const data = {
        id: editedVehicle.id as number,
        name: formData.get('name') as string,
        type: formData.get('type') as string,
        manufacturer: formData.get('manufacturer') as string,
        capacity: parseInt(formData.get('capacity') as string),
      };

      const validatedData = VehicleSchema.parse(data);

      const response = await fetch(`http://127.0.0.1:8080/vehicles/${editedVehicle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        setVehicles((prevVehicles) => ({
          values: prevVehicles.values.map((vehicle) => (vehicle.id === editedVehicle.id ? validatedData : vehicle)),
          meta: prevVehicles.meta,
        }));
        setShowEdit(false);
        setEditedVehicle(initialValues);
        showNotification('Vehicle successfully updated', 'success');
      } else {
        showNotification('Failed to update vehicle', 'error');
      }
    } catch (err) {
      if (isZodError(err)) {
        setErrors(
          err.issues.reduce((acc, error) => {
            return { ...acc, [error.path[0]]: error.message };
          }, {} as VehicleForm),
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
  }, [editedVehicle]);

  const onCreate = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setErrors(initialErrors);
      const formData = new FormData(event.currentTarget);

      const data = {
        id: null,
        name: formData.get('name') as string,
        type: formData.get('type') as string,
        manufacturer: formData.get('manufacturer') as string,
        capacity: parseInt(formData.get('capacity') as string),
      };

      const validatedData = VehicleSchema.parse(data);

      const response = await fetch('http://127.0.0.1:8080/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      if (response.ok) {
        setVehicles((prevVehicles) => ({
          values: [...prevVehicles.values, validatedData],
          meta: prevVehicles.meta,
        }));
        setShowCreate(false);
        showNotification('Vehicle successfully added', 'success');
      } else {
        showNotification('Failed to add vehicle', 'error');
      }
    } catch (err) {
      if (isZodError(err)) {
        setErrors(
          err.issues.reduce((acc, error) => {
            return { ...acc, [error.path[0]]: error.message };
          }, {} as VehicleForm),
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
  }, [vehicles]);

  return (
    <>
      <Typography variant="h4" sx={styles.tableHeading}>
        Vehicles List
      </Typography>
      <Button onClick={onCreateToggle}>Create new</Button>
      {vehicles && (
        <DataGrid
          loading={!vehicles.values.length}
          rows={vehicles.values}
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
            <Typography variant="h6">Edit Vehicle</Typography>
            <Grid container spacing={4}>
              <Grid xs={12} md={6} item>
                <TextField
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  autoComplete="off"
                  defaultValue={editedVehicle?.name}
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
                  defaultValue={editedVehicle?.type}
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
                  defaultValue={editedVehicle?.manufacturer}
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
                  defaultValue={editedVehicle?.capacity}
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
            <Typography variant="h6">Create Vehicle</Typography>
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

export { VehiclesList };
