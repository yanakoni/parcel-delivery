import { Box, Button, Grid, Modal, TextField, Typography } from '@mui/material';
import { styles } from '../dashboard/styles';
import { CustomNoRowsOverlay } from '../../components';
import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { number, object, string, TypeOf } from 'zod';
import { showNotification } from '../../utils';
import { hasErrorMessage, isApiError, isZodError } from '../../guards';
import { LoadingButton } from '@mui/lab';

type VehicleForm = {
  id: number | null;
  vehiclename: string;
  email: string;
};

const initialErrors: Omit<VehicleForm, 'id'> = {
  vehiclename: '',
  email: '',
};

const initialValues: VehicleForm = {
  id: null,
  vehiclename: '',
  email: '',
};

const VehicleSchema = object({
  id: number().nullable(),
  vehiclename: string().nonempty('Vehiclename is required'),
  email: string().nonempty('Email is required'),
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
    field: 'vehiclename',
    headerName: 'Vehiclename',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
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
  const vehicles = useRef<{
    values: any[];
    meta: {
      page: number;
      pages: number;
      total: number;
      count: number;
    };
  }>({
    values: Array.from(Array(100).keys()).map((i) => ({
      id: i + 1,
      vehiclename: `Vehicle ${i + 1}`,
      email: `email${i + 1}@test.com`,
    })),
    meta: {
      page: 0,
      pages: 5,
      total: 100,
      count: 20,
    },
  });
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editedVehicle, setEditedVehicle] = useState<VehicleSchemaInput>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const methods = useForm<VehicleSchemaInput>({
    resolver: zodResolver(VehicleSchema),
  });

  useEffect(() => {
    // (async () => {
    //   const response = await fetch('http://localhost:5000/api/vehicles');
    //   setVehicles(await response.json());
    // })();
  }, []);

  const onDelete = async (id: number) => {
    vehicles.current = {
      values: vehicles.current?.values.filter((vehicle) => vehicle.id !== id) || [],
      meta: {
        page: 0,
        pages: 5,
        total: 100,
        count: 20,
      },
    };
    // const response = await fetch('http://localhost:5000/api/vehicles', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ id }),
    // });
    //   setVehicles(await response.json());
    showNotification('Vehicle successfully deleted', 'success');
  };

  const onEditToggle = async (id: number) => {
    setShowEdit(!showEdit);
    setEditedVehicle(vehicles.current?.values.find((vehicle) => vehicle.id === id));
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
        vehiclename: formData.get('vehiclename') as string,
        email: formData.get('email') as string,
      };

      const validatedData = VehicleSchema.parse(data);

      // const response = await fetch('http://localhost:5000/api/vehicles', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(validatedData),
      // });
      // setVehicles(await response.json());

      // if (!Object.keys(response).length) {
      //   return showNotification('Unexpected error', 'error');
      // }

      vehicles.current = {
        values: vehicles.current?.values.map((vehicle) => (vehicle.id === editedVehicle.id ? validatedData : vehicle)) || [],
        meta: {
          page: 0,
          pages: 5,
          total: 100,
          count: 20,
        },
      };
      setShowEdit(false);
      setEditedVehicle(initialValues);

      showNotification('Vehicle successfully updated', 'success');
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
  }, []);

  const onCreate = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setErrors(initialErrors);
      const formData = new FormData(event.currentTarget);

      const data = {
        id: vehicles.current?.values?.length + 1 || 0,
        vehiclename: formData.get('vehiclename') as string,
        email: formData.get('email') as string,
      };

      console.log(data);

      const validatedData = VehicleSchema.parse(data);

      console.log(validatedData);

      // const response = await fetch('http://localhost:5000/api/vehicles', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(validatedData),
      // });
      // setVehicles(await response.json());

      // if (!Object.keys(response).length) {
      //   return showNotification('Unexpected error', 'error');
      // }

      vehicles.current = {
        values: [...(vehicles.current?.values || []), validatedData],
        meta: {
          page: 0,
          pages: 5,
          total: 100,
          count: 20,
        },
      };
      setShowCreate(false);

      showNotification('Vehicle successfully added', 'success');
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
  }, []);

  return (
    <>
      <Typography variant="h4" sx={styles.tableHeading}>
        Vehicles List
      </Typography>
      <Button onClick={onCreateToggle}>Create new</Button>
      {vehicles && (
        <DataGrid
          loading={!vehicles.current.values.length}
          rows={vehicles.current.values}
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
        <FormProvider {...methods}>
          <Box component="form" onSubmit={onEdit} sx={styles.modalBox} mt={4} noValidate>
            <Typography variant="h6">Edit Vehicle</Typography>
            <Grid container spacing={4}>
              <Grid xs={12} md={6} item>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  defaultValue={editedVehicle?.email}
                  helperText={errors.email}
                  error={!!errors.email}
                  fullWidth
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid xs={12} md={6} item>
              <TextField
                id="vehiclename"
                name="vehiclename"
                label="Vehiclename"
                type="text"
                autoComplete="off"
                defaultValue={editedVehicle?.vehiclename}
                helperText={errors.vehiclename}
                error={!!errors.vehiclename}
                fullWidth
              />
            </Grid>
            <LoadingButton type="submit" variant="contained" sx={styles.formButton}>
              Update
            </LoadingButton>
          </Box>
        </FormProvider>
      </Modal>
      <Modal open={showCreate} onClose={() => setShowCreate(false)}>
        <FormProvider {...methods}>
          <Box component="form" onSubmit={onCreate} sx={styles.modalBox} mt={4} noValidate>
            <Typography variant="h6">Create Vehicle</Typography>
            <Grid container spacing={4}>
              <Grid xs={12} md={6} item>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  helperText={errors.email}
                  error={!!errors.email}
                  fullWidth
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid xs={12} md={6} item>
              <TextField
                id="vehiclename"
                name="vehiclename"
                label="Vehiclename"
                type="text"
                autoComplete="off"
                helperText={errors.vehiclename}
                error={!!errors.vehiclename}
                fullWidth
              />
            </Grid>
            <LoadingButton type="submit" variant="contained" sx={styles.formButton}>
              Create
            </LoadingButton>
          </Box>
        </FormProvider>
      </Modal>
    </>
  );
};

export { VehiclesList };
