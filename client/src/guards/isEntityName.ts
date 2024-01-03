import { ENTITIES, EntityName } from '../consts';

export const isEntityName = (
  entityName: EntityName | string,
): entityName is EntityName => {
  return Object.values(ENTITIES).includes(entityName as EntityName);
};
