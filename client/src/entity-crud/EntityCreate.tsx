import { FC, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useCreateEntityMutation } from '../api';
import { ENTITY_LIST_ROUTE, ROUTES } from '../consts';
import { EntityConfigAndName, useEntityConfig, useHasPermissions } from '../hooks';

interface EntityCreateContentProps {
  entityConfig: EntityConfigAndName;
}

const EntityCreateContent: FC<EntityCreateContentProps> = ({ entityConfig }) => {
  const { apiUrl, entityName, serializerName, createPage: CreateEntityPage, permission } = entityConfig;

  const navigate = useNavigate();

  const [createEntity, createEntityReq] = useCreateEntityMutation();

  const { isLoading } = createEntityReq;

  const create = useCallback(
    async (data: Record<string, any>) => {
      try {
        await createEntity({
          entity: apiUrl,
          entityName: entityName,
          body: {
            ...data,
            _type: serializerName,
          },
        }).unwrap();

        navigate(ENTITY_LIST_ROUTE + entityName);
      } catch (e) {
        console.log(e);
      }
    },
    [createEntity, apiUrl, entityName, serializerName, navigate],
  );

  const hasPermissions = useHasPermissions({
    ...permission,
    action: 'write',
  });

  if (!hasPermissions || !CreateEntityPage) return <Navigate to={ROUTES.DASHBOARD} />;

  return <CreateEntityPage create={create} isLoading={isLoading} />;
};

export const EntityCreate = () => {
  const entityConfig = useEntityConfig();

  if (!entityConfig) return 'There are no resources by this path!';

  return <EntityCreateContent entityConfig={entityConfig} />;
};
