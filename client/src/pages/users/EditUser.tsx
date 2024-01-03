import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ENTITIES, ENTITY_LIST_ROUTE } from '../../consts';
import { EditEntityPageProps } from '../../entity-crud';
import { User } from '../../interfaces';

export const EditUserPage: FC<EditEntityPageProps<User>> = () => {
  return <Navigate to={`${ENTITY_LIST_ROUTE}${ENTITIES.USERS}`} />;
};
