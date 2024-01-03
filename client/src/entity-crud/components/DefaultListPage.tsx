import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ENTITY_CREATE_ROUTE, ENTITY_EDIT_ROUTE } from '../../consts';
import { useDeleteEntityMutation } from '../../api';
import { useHasPermissions } from '../../hooks';
import { Filters } from './Filters';
import { ListEntityPageProps } from '../config';
import { Loader, PaginatedTable } from '../../components';

export const DefaultListPage: FC<ListEntityPageProps> = ({
  entityConfig,
  isLoading,
  apiUrl,
  data,
  filtersState,
  changeFiltersValue,
  setDynamicQueryObj,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    listColumns,
    deleteNotAllowed,
    createNotAllowed,
    permission,
    entityName,
    createPage,
    filters,
    deletableRowCondition,
    editableRowCondition,
  } = entityConfig;

  const hasEditPermissions = useHasPermissions({
    ...permission,
    action: 'write',
  });

  const [deleteEntity, deleteEntityRes] = useDeleteEntityMutation();

  const onDelete = useCallback(
    (entityId: string) => {
      console.log('delete: ', entityName, entityId);
      deleteEntity({
        entity: { url: apiUrl, method: 'DELETE' },
        entityName,
        id: entityId,
      });
      // TODO: need to update local data
    },
    [deleteEntity, apiUrl, entityName],
  );

  const onEdit = useCallback(
    (entityId: string) => {
      navigate(ENTITY_EDIT_ROUTE + `${entityName}/${entityId}`);
    },
    [entityName, navigate],
  );

  const createEntity = useCallback(() => {
    navigate(ENTITY_CREATE_ROUTE + entityName);
  }, [navigate, entityName]);

  if (!listColumns) throw new Error('listColumns was not provided!');

  if (deleteEntityRes.isLoading) return <Loader type="page" />;

  return (
    <Box sx={{ width: '100%', backgroundColor: 'white', p: 2, borderRadius: 3 }}>
      <h2>{t(`resources.listTitles.${entityName}`)}</h2>
      <Grid container columnSpacing={2} sx={{ mb: 2 }}>
        <Grid item sm={9} xs={12}>
          {filters && (
            <Filters filterList={filters} changeFiltersValue={changeFiltersValue} filtersState={filtersState} />
          )}
        </Grid>
        {!createNotAllowed && (
          <Grid item display="flex" justifyContent="flex-end" xs={12} sm={3}>
            {createPage && (
              <Button fullWidth color="primary" variant="contained" startIcon={<AddIcon />} onClick={createEntity}>
                Add record
              </Button>
            )}
          </Grid>
        )}
      </Grid>
      <PaginatedTable
        data={data}
        columns={listColumns}
        loading={isLoading}
        setDynamicQueryObj={setDynamicQueryObj}
        deletable={!deleteNotAllowed}
        editable={hasEditPermissions}
        onDelete={onDelete}
        onEdit={onEdit}
        deletableRowCondition={deletableRowCondition}
        editableRowCondition={editableRowCondition}
      />
    </Box>
  );
};
