import { FC, useCallback, useMemo, useState } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { object, preprocess, string, TypeOf } from 'zod';
import { useTranslation } from 'react-i18next';
import { grey } from '@mui/material/colors';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, Typography } from '@mui/material';
import { CreateFormWrapper, FormInput } from '../../components';
import { PermissionList } from './components';
import { CreateEntityPageProps } from '../../entity-crud';
import { CreateRole } from '../../interfaces';

const createRoleSchema = object({
  name: string()
    .nonempty('Name is required')
    .max(32, 'Name must be less than 100 characters'),
  description: preprocess(
    (s) => (s === '' ? null : s),
    string().min(1).nullable(),
  ),
});

type CreateRoleInput = TypeOf<typeof createRoleSchema>;

export const CreateRolePage: FC<CreateEntityPageProps<CreateRole>> = ({
  create,
  isLoading,
}) => {
  const { t } = useTranslation();

  const [permissions, setPermissions] = useState<string[]>([]);

  const permissionsToSave = useMemo<Record<string, boolean>>(() => {
    return permissions.reduce<Record<string, boolean>>((acc, current) => {
      acc[current] = true;

      return acc;
    }, {});
  }, [permissions]);

  const onPermissionsCheck = useCallback((values: string[]) => {
    setPermissions(values);
  }, []);

  const methods = useForm<CreateRoleInput>({
    resolver: zodResolver(createRoleSchema),
  });

  const { handleSubmit } = methods;

  const onSubmitHandler: SubmitHandler<CreateRoleInput> = async (values) => {
    console.log(values);
    await create({
      ...values,
      accessScope: permissionsToSave,
    });
  };

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
              {t('create.roleFormTitle')}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={9}>
            <FormInput name="name" label="Name" />
          </Grid>
          <Grid item xs={12} lg={9}>
            <FormInput name="description" label="Description" />
          </Grid>
          <Grid item xs={12} lg={9}>
            <PermissionList initiallyChecked={[]} onData={onPermissionsCheck} />
          </Grid>
          <Grid item xs={12} lg={9}>
            <LoadingButton
              type="submit"
              loading={isLoading}
              fullWidth
              variant="contained"
            >
              {t('create.createButton')}
            </LoadingButton>
          </Grid>
        </Grid>
      </FormProvider>
    </CreateFormWrapper>
  );
};
