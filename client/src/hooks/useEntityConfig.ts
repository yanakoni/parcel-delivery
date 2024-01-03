import { useParams } from 'react-router-dom';
import { ENTITY_CONFIGS, EntityName, EntityConfig } from '../entity-crud';
import { isEntityName } from '../guards';

export type EntityConfigAndName = EntityConfig & { entityName: EntityName };

export const useEntityConfig = (): EntityConfigAndName | null => {
  const { entityName } = useParams();

  if (!entityName || !isEntityName(entityName)) return null;

  return {
    ...ENTITY_CONFIGS[entityName],
    entityName,
  };
};
