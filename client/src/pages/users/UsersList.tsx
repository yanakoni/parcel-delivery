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
import { getKcAdminClient } from '../../api/keycloakAdminClient';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import { USER_ROLES } from '../../consts';
import KcAdminClient from '@keycloak/keycloak-admin-client';
import MappingsRepresentation from '@keycloak/keycloak-admin-client/lib/defs/mappingsRepresentation';
import RoleRepresentation from '@keycloak/keycloak-admin-client/lib/defs/roleRepresentation';

type UserForm = {
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

const initialValues: UserForm = {
  id: null,
  name: '',
  type: '',
  manufacturer: '',
  capacity: 0,
};

const UserSchema = object({
  id: string().nullable().optional(),
  name: string().nonempty('Name is required'),
  type: string().nonempty('Type is required'),
  manufacturer: string().nonempty('Manufacturer is required'),
  capacity: number().min(0, 'Capacity must be greater than or equal to 0'),
});

type UserSchemaInput = TypeOf<typeof UserSchema>;


const columns = (onDelete: (id: string) => Promise<void>, onEdit: (id: string) => void): GridColDef<any>[] => [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'firstName',
    headerName: 'First Name',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'lastName',
    headerName: 'Last Name',
    flex: 1,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'username',
    headerName: 'Email',
    flex: 2,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
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

const UsersList = () => {
  const [users, setUsers] = useState<{
    values: UserRepresentation[];
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
  const [editedUser, setEditedUser] = useState<UserSchemaInput>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const methods = useForm<UserSchemaInput>({
    resolver: zodResolver(UserSchema),
  });


  async function fetchUserRole(userId: string, kcClient: KcAdminClient): Promise<string> {
    const listRoleMappings = await kcClient.users.listRoleMappings({ id: userId });
    const roles = listRoleMappings.realmMappings;

    // Try to find a 'Driver' or 'Manager' role first
    const prioritizedRoles = roles.filter(role => ['Driver', 'Manager'].includes(role.name));

    if (prioritizedRoles.length > 0) {
      // If a 'Driver' or 'Manager' role is found, return the name of the first one
      return prioritizedRoles[0].name;
    } else {
      // If neither 'Driver' nor 'Manager' roles are found, return 'User'
      return 'User';
    }
  }

  const fetchUsers = async () => {
    const kcClient = await getKcAdminClient();
    try {
      const users = await kcClient.users.find();

      const userProfilePromises = users.map(user =>
        fetchUserRole(user.id, kcClient).then(role => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          role: role,
        }))
      );

      const usersWithRoles = await Promise.all(userProfilePromises);

      setUsers({
        values: usersWithRoles,
        meta: {
          page: 0,
          pages: 0,
          total: 0,
          count: 0,
        },
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      showNotification('Error fetching users', 'error');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Run only on mount

  const onDelete = async (id: string) => {
    try {
      const kcClient = await getKcAdminClient();
      await kcClient.users.del({id: id});
      setUsers((prevUsers) => ({
        values: prevUsers.values.filter((user) => user.id !== id),
        meta: prevUsers.meta,
      }));
      showNotification('User successfully deleted', 'success');
    } catch (error) {
      console.error('Error deleting user:', error);
      showNotification('Unexpected error', 'error');
    }
  };

  const onEditToggle = (id: string) => {
    setShowEdit(!showEdit);
    setEditedUser(users.values.find((user) => user.id === id) || initialValues);
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
          id: editedUser.id as string,
          name: formData.get('name') as string,
          type: formData.get('type') as string,
          manufacturer: formData.get('manufacturer') as string,
          capacity: parseInt(formData.get('capacity') as string),
        };

        const validatedData = UserSchema.parse(data);

        const response = await fetch(`http://localhost:3000/vehicles/${editedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        });

        if (response.ok) {
          setUsers({
            values: users.values.map((user) =>
              user.id === editedUser.id ? validatedData : user,
            ) as UserForm[],
            meta: users.meta,
          });
          setShowEdit(false);
          setEditedUser(initialValues);
          showNotification('User successfully updated', 'success');
        } else {
          showNotification('Failed to update user', 'error');
        }
      } catch (err) {
        if (isZodError(err)) {
          setErrors(
            err.issues.reduce((acc, error) => {
              return { ...acc, [error.path[0]]: error.message };
            }, {} as UserForm),
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
    [users, editedUser],
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

        const validatedData = UserSchema.parse(data);

        const response = await fetch('http://localhost:3000/vehicles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(validatedData),
        });

        const dataResponse = await response.json();

        if (response.ok) {
          setUsers({
            values: [...users.values, dataResponse.data],
            meta: users.meta,
          });
          setShowCreate(false);
          showNotification('User successfully added', 'success');
        } else {
          showNotification('Failed to add user', 'error');
        }
      } catch (err) {
        if (isZodError(err)) {
          setErrors(
            err.issues.reduce((acc, error) => {
              return { ...acc, [error.path[0]]: error.message };
            }, {} as UserForm),
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
    [users],
  );

  return (
    <>
      <Typography variant="h4" sx={styles.tableHeading}>
        Users List
      </Typography>
      <Button onClick={onCreateToggle}>Create new</Button>
      {users && (
        <DataGrid
          loading={!users.values.length}
          rows={users.values}
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
              <Typography variant="h6">Edit User</Typography>
              <Grid container spacing={4}>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedUser?.name}
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
                    defaultValue={editedUser?.type}
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
                    defaultValue={editedUser?.manufacturer}
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
                    defaultValue={editedUser?.capacity}
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
              <Typography variant="h6">Create User</Typography>
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

export { UsersList };
