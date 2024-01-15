import { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { object, string, TypeOf } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { grey } from '@mui/material/colors';
import { CreateFormWrapper, FormInput, Loader } from '../../components';
import { PermissionList } from './components';
import { EditEntityPageProps } from '../../entity-crud';
import { EditRole, Role } from '../../interfaces';

const createRoleSchema = object({
  name: string().nonempty('Name is required').max(32, 'Name must be less than 100 characters'),
  description: string(),
});

type CreateRoleInput = TypeOf<typeof createRoleSchema>;

export const EditRolePage: FC<EditEntityPageProps<Role, EditRole>> = ({
  isLoading,
  update,
  isUpdating,
  entityData,
}) => {
  const { t } = useTranslation();
  const [permissions, setPermissions] = useState<string[]>([]);

  const permissionsToSave = useMemo<Record<string, boolean>>(() => {
    return permissions.reduce<Record<string, boolean>>((acc, current) => {
      acc[current] = true;

      return acc;
    }, {});
  }, [permissions]);

  const initiallyCheckedPermissions = useMemo<string[]>(() => {
    if (!entityData) return [];

    return Object.keys(entityData.accessScope).filter((permission) => entityData.accessScope[permission]);
  }, [entityData]);

  const onPermissionsCheck = useCallback((values: string[]) => {
    setPermissions(values);
  }, []);

  const methods = useForm<CreateRoleInput>({
    resolver: zodResolver(createRoleSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<CreateRoleInput> = (values) => {
    update({
      ...values,
      accessScope: permissionsToSave,
    });
  };

  if (isLoading || isUpdating) return <Loader type="page" />;

  return (
    <CreateFormWrapper>
      <FormProvider {...methods}>
        <Grid
          container
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          autoComplete="off"
          justifyContent="center"
          rowSpacing={2}
        >
          <Grid item xs={12} lg={9} mb={3} justifyContent="center">
            <Typography textAlign="center" variant="h4" color={grey[600]}>
              {t('edit.roleFormTitle')}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <FormInput disabled={entityData?.system} name="name" label="Name" defaultValue={entityData?.name} />
          </Grid>
          <Grid item xs={12} lg={9}>
            <FormInput
              disabled={entityData?.system}
              name="description"
              label="Description"
              defaultValue={entityData?.description}
            />
          </Grid>
          <Grid item xs={12} lg={9}>
            <PermissionList
              readonly={entityData?.system}
              initiallyChecked={initiallyCheckedPermissions}
              onData={onPermissionsCheck}
            />
          </Grid>
          {!entityData?.system && (
            <Grid item xs={12} lg={9}>
              <LoadingButton type="submit" loading={isLoading} fullWidth variant="contained">
                {t('edit.editButton')}
              </LoadingButton>
            </Grid>
          )}
        </Grid>
      </FormProvider>
    </CreateFormWrapper>
  );
};
