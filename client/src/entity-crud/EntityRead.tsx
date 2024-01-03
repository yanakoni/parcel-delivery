import { FC } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { EntityConfigAndName, useEntityConfig, useHasPermissions } from '../hooks';
import { ROUTES } from '../consts';
import { useGetEntityQuery } from '../api';

interface EntityReadContentProps {
  entityConfig: EntityConfigAndName;
  entityId: string;
}

const EntityReadContent: FC<EntityReadContentProps> = ({ entityConfig, entityId }) => {
  const { entityName, apiUrl, readPage: ReadEntityPage, permission, includes } = entityConfig;

  const entityReq = useGetEntityQuery({
    entity: apiUrl,
    entityId: entityId!,
    ...(includes.read && { include: includes.read }),
    entityName,
  });

  const hasPermissions = useHasPermissions({
    ...permission,
    action: 'read',
  });

  if (!hasPermissions || !ReadEntityPage) return <Navigate to={ROUTES.DASHBOARD} />;

  return (
    <ReadEntityPage
      isLoading={entityReq.isFetching}
      entityData={entityReq.data}
      entityName={entityName!}
      entityId={entityId!}
    />
  );
};

export const EntityRead = () => {
  const { entityId } = useParams();
  const entityConfig = useEntityConfig();

  if (!entityConfig || !entityId) return 'There are no resources by this path!';

  return <EntityReadContent entityConfig={entityConfig} entityId={entityId} />;
};
