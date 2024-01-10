import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ENTITIES, ENTITY_LIST_ROUTE } from '../../consts';
import { EditEntityPageProps } from '../../entity-crud';
import { Vehicle } from '../../interfaces';

export const EditVehiclePage: FC<EditEntityPageProps<Vehicle>> = () => {
  return <Navigate to={`${ENTITY_LIST_ROUTE}${ENTITIES.VEHICLES}`} />;
};
