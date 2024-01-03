import { FC, useCallback } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { EntityName } from './config';
import { EntityConfigAndName, useEntityConfig, useHasPermissions } from '../hooks';
import { isFetchBaseQueryErrorType } from '../guards';
import { ROUTES } from '../consts';
import { useGetEntityQuery, useUpdateEntityMutation } from '../api';

interface EntityEditContentProps {
  entityConfig: EntityConfigAndName;
  entityId: string;
}

const EntityEditContent: FC<EntityEditContentProps> = ({ entityConfig, entityId }) => {
  const { apiUrl, entityName, serializerName, editPage: EditEntityPage, permission, includes } = entityConfig;

  const entityReq = useGetEntityQuery({
    entity: apiUrl,
    entityId: entityId!,
    ...(includes.edit && { include: includes.edit }),
    entityName,
  });

  const [updateEntity, updateEntityReq] = useUpdateEntityMutation();

  const update = useCallback(
    async (data: Record<string, any>) => {
      await updateEntity({
        body: {
          ...data,
          _type: serializerName,
        },
        id: entityId as string,
        entity: apiUrl,
        entityName: entityName as EntityName,
      });
    },
    [apiUrl, entityId, entityName, serializerName, updateEntity],
  );

  const hasPermissions = useHasPermissions({
    ...permission,
    action: 'write',
  });

  if (!hasPermissions || !EditEntityPage) return <Navigate to={ROUTES.DASHBOARD} />;

  if (isFetchBaseQueryErrorType(entityReq.error) && entityReq.error.status === 404) {
    return <div>Resource was not found!</div>;
  }

  return (
    <EditEntityPage
      isLoading={entityReq.isFetching}
      entityData={entityReq.data}
      update={update}
      isUpdating={updateEntityReq.isLoading}
    />
  );
};

export const EntityEdit = () => {
  const { entityId } = useParams();
  const entityConfig = useEntityConfig();

  if (!entityConfig || !entityId) return 'There are no resources by this path!';

  return <EntityEditContent entityConfig={entityConfig} entityId={entityId} />;
};
