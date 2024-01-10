import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ENTITIES, ENTITY_LIST_ROUTE } from '../../consts';
import { CreateEntityPageProps } from '../../entity-crud';

export const CreateVahiclePage: FC<CreateEntityPageProps> = () => {
  return <Navigate to={`${ENTITY_LIST_ROUTE}${ENTITIES.VEHICLES}`} />;
};
