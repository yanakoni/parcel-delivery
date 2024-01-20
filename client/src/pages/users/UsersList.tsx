import { Box, Button, Grid, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { styles } from '../dashboard/styles';
import { CustomNoRowsOverlay } from '../../components';
import { FormEvent, useCallback, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { showNotification } from '../../utils';
import { hasErrorMessage, isApiError, isZodError } from '../../guards';
import { LoadingButton } from '@mui/lab';
import { getKcAdminClient } from '../../api/keycloakAdminClient';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import KcAdminClient from '@keycloak/keycloak-admin-client';

type UserForm = {
  id: string | null;
  firstName: string;
  lastName: string;
  role: string;
};

const initialErrors: any = {
  firstName: '',
  lastName: '',
  role: '',
};

const initialValues: UserForm = {
  id: null,
  firstName: '',
  lastName: '',
  role: '',
};

const UserSchema = object({
  id: string().nullable().optional(),
  firstName: string().nonempty('First Name is required'),
  lastName: string().nonempty('Last Name is required'),
  role: string().nonempty('Role is required'),
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
    const prioritizedRoles = roles.filter((role) => ['driver', 'admin'].includes(role.name));

    if (prioritizedRoles.length > 0) {
      // If a 'Driver' or 'Manager' role is found, return the name of the first one
      return prioritizedRoles[0].name;
    } else {
      // If neither 'Driver' nor 'Manager' roles are found, return 'User'
      return 'client';
    }
  }

  const fetchUsers = async () => {
    const kcClient = await getKcAdminClient();
    try {
      const users = await kcClient.users.find();

      const userProfilePromises = users.map((user) =>
        fetchUserRole(user.id, kcClient).then((role) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          role: role,
        })),
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
      await kcClient.users.del({ id: id });
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

        const kcClient = await getKcAdminClient();
        let userProfile = await kcClient.users.findOne({ id: editedUser.id, userProfileMetadata: true });
        const data = {
          firstName: formData.get('firstName') as string,
          lastName: formData.get('lastName') as string,
          role: formData.get('role') as string,
        };
        const validatedData = UserSchema.parse(data);

        userProfile.firstName = validatedData.firstName;
        userProfile.lastName = validatedData.lastName;

        // update role:
        const currentRole = users.values.filter((user) => user.id === editedUser.id)[0].role;
        const newRolePayload =
          validatedData.role === 'driver'
            ? { name: 'driver', id: '067b1624-08f2-4824-9086-a8e5c75ca41f' }
            : validatedData.role === 'admin'
            ? { name: 'admin', id: 'db2b1dfa-03be-4466-a158-96c54f5403b9' }
            : null;
        console.log(newRolePayload, currentRole);
        let newRoleName = 'client';
        if (newRolePayload === null) {
          await kcClient.users.delRealmRoleMappings({
            id: editedUser.id,
            roles: [
              { name: 'driver', id: '067b1624-08f2-4824-9086-a8e5c75ca41f' },
              { name: 'admin', id: 'db2b1dfa-03be-4466-a158-96c54f5403b9' },
            ],
          });
        } else if (newRolePayload.name === 'driver') {
          if (currentRole === 'admin') {
            await kcClient.users.delRealmRoleMappings({
              id: editedUser.id,
              roles: [{ name: 'admin', id: 'db2b1dfa-03be-4466-a158-96c54f5403b9' }],
            });
          }
          newRoleName = 'driver';
          await kcClient.users.addRealmRoleMappings({ id: editedUser.id, roles: [newRolePayload] });
        } else if (newRolePayload.name === 'admin') {
          if (currentRole === 'driver') {
            await kcClient.users.delRealmRoleMappings({
              id: editedUser.id,
              roles: [{ name: 'driver', id: '067b1624-08f2-4824-9086-a8e5c75ca41f' }],
            });
          }
          await kcClient.users.addRealmRoleMappings({ id: editedUser.id, roles: [newRolePayload] });
          newRoleName = 'admin';
        }

        await kcClient.users.update({ id: editedUser.id }, userProfile);
        setUsers({
          values: users.values.map((user) =>
            user.id === user.id
              ? {
                  id: userProfile?.id,
                  firstName: userProfile?.firstName,
                  lastName: userProfile?.lastName,
                  username: userProfile?.email,
                  role: newRoleName,
                }
              : user,
          ) as UserRepresentation[],
          meta: users.meta,
        });
        setShowEdit(false);
        setEditedUser(initialValues);
        showNotification('User successfully updated', 'success');
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

  return (
    <>
      <Typography variant="h4" sx={styles.tableHeading}>
        Users List
      </Typography>
      {/* <Button onClick={onCreateToggle}>Create new</Button> */}
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
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedUser?.firstName}
                    helperText={errors.firstName}
                    error={!!errors.firstName}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    autoComplete="off"
                    defaultValue={editedUser?.lastName}
                    helperText={errors.lastName}
                    error={!!errors.lastName}
                    fullWidth
                  />
                </Grid>
                <Grid xs={12} md={6} item>
                  <Select
                    id="role"
                    name="role"
                    label="Role"
                    autoComplete="off"
                    defaultValue={editedUser?.role}
                    // error={!!errors.role}
                    fullWidth
                  >
                    <MenuItem value={'client'}>Client</MenuItem>
                    <MenuItem value={'driver'}>Driver</MenuItem>
                    <MenuItem value={'admin'}>Admin</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <LoadingButton type="submit" variant="contained" sx={styles.formButton}>
                Update
              </LoadingButton>
            </Box>
          </FormProvider>
        </div>
      </Modal>
    </>
  );
};

export { UsersList };
