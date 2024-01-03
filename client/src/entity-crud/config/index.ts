import { Endpoint, ENTITIES, EntityName } from '../../consts';
import { EntityConfig } from './config.interface';
import { usersConfig } from './users';
import { rolesConfig } from './roles';
import { parcelsConfig } from './parcels';
import { driversConfig } from './drivers';
import { postOfficesConfig } from './postOffices';
import { vehiclesConfig } from './vehicles';
import { customersConfig } from './customers';
import { transactionsConfig } from './transactions';
import { permissionsConfig } from './permissions';

const ENTITY_CONFIGS: Record<EntityName, EntityConfig> = {
  [ENTITIES.USERS]: usersConfig,
  [ENTITIES.ROLES]: rolesConfig,
  [ENTITIES.PARCELS]: parcelsConfig,
  [ENTITIES.DRIVERS]: driversConfig,
  [ENTITIES.POST_OFFICES]: postOfficesConfig,
  [ENTITIES.VEHICLES]: vehiclesConfig,
  [ENTITIES.CUSTOMERS]: customersConfig,
  [ENTITIES.TRANSACTIONS]: transactionsConfig,
  [ENTITIES.PERMISSIONS]: permissionsConfig,
};

export { ENTITY_CONFIGS };
export type { Endpoint, EntityName };
export * from './config.interface';
