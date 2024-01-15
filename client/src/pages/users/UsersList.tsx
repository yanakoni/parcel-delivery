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

type UserForm = {
  id: number | null;
  username: string;
  email: string;
};

const initialErrors: Omit<UserForm, 'id'> = {
  username: '',
  email: '',
};

const initialValues: UserForm = {
  id: null,
  username: '',
  email: '',
};

const UserSchema = object({
  id: number().nullable(),
  username: string().nonempty('Username is required'),
  email: string().nonempty('Email is required'),
});

type UserSchemaInput = TypeOf<typeof UserSchema>;

const columns = (onDelete: (id: number) => Promise<void>, onEdit: (id: number) => void): GridColDef<any>[] => [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
  },
  {
    field: 'username',
    headerName: 'Username',
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

const UsersList = () => {
  const users = useRef<{
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
      username: `User ${i + 1}`,
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
  const [editedUser, setEditedUser] = useState<UserSchemaInput>(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const methods = useForm<UserSchemaInput>({
    resolver: zodResolver(UserSchema),
  });

  useEffect(() => {
    // (async () => {
    //   const response = await fetch('http://localhost:5000/api/users');
    //   setUsers(await response.json());
    // })();
  }, []);

  const onDelete = async (id: number) => {
    users.current = {
      values: users.current?.values.filter((user) => user.id !== id) || [],
      meta: {
        page: 0,
        pages: 5,
        total: 100,
        count: 20,
      },
    };
    // const response = await fetch('http://localhost:5000/api/users', {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ id }),
    // });
    //   setUsers(await response.json());
    showNotification('User successfully deleted', 'success');
  };

  const onEditToggle = async (id: number) => {
    setShowEdit(!showEdit);
    setEditedUser(users.current?.values.find((user) => user.id === id));
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
        id: editedUser.id as number,
        username: formData.get('username') as string,
        email: formData.get('email') as string,
      };

      const validatedData = UserSchema.parse(data);

      // const response = await fetch('http://localhost:5000/api/users', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(validatedData),
      // });
      // setUsers(await response.json());

      // if (!Object.keys(response).length) {
      //   return showNotification('Unexpected error', 'error');
      // }

      users.current = {
        values: users.current?.values.map((user) => (user.id === editedUser.id ? validatedData : user)) || [],
        meta: {
          page: 0,
          pages: 5,
          total: 100,
          count: 20,
        },
      };
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
  }, []);

  const onCreate = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setErrors(initialErrors);
      const formData = new FormData(event.currentTarget);

      const data = {
        id: users.current?.values?.length + 1 || 0,
        username: formData.get('username') as string,
        email: formData.get('email') as string,
      };

      const validatedData = UserSchema.parse(data);

      // const response = await fetch('http://localhost:5000/api/users', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(validatedData),
      // });
      // setUsers(await response.json());

      // if (!Object.keys(response).length) {
      //   return showNotification('Unexpected error', 'error');
      // }

      users.current = {
        values: [...(users.current?.values || []), validatedData],
        meta: {
          page: 0,
          pages: 5,
          total: 100,
          count: 20,
        },
      };
      setShowCreate(false);

      showNotification('User successfully added', 'success');
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
  }, []);

  return (
    <>
      <Typography variant="h4" sx={styles.tableHeading}>
        Users List
      </Typography>
      <Button onClick={onCreateToggle}>Create new</Button>
      {users && (
        <DataGrid
          loading={!users.current.values.length}
          rows={users.current.values}
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
            <Typography variant="h6">Edit User</Typography>
            <Grid container spacing={4}>
              <Grid xs={12} md={6} item>
                <TextField
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                  defaultValue={editedUser?.email}
                  helperText={errors.email}
                  error={!!errors.email}
                  fullWidth
                  autoFocus
                />
              </Grid>
            </Grid>
            <Grid xs={12} md={6} item>
              <TextField
                id="username"
                name="username"
                label="Username"
                type="text"
                autoComplete="off"
                defaultValue={editedUser?.username}
                helperText={errors.username}
                error={!!errors.username}
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
            <Typography variant="h6">Create User</Typography>
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
                id="username"
                name="username"
                label="Username"
                type="text"
                autoComplete="off"
                helperText={errors.username}
                error={!!errors.username}
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

export { UsersList };
