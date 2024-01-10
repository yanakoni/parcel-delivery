import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ENTITIES, ENTITY_LIST_ROUTE } from '../../consts';
import { EditEntityPageProps } from '../../entity-crud';
import { PostOffice } from '../../interfaces';

export const EditPostOfficesPage: FC<EditEntityPageProps<PostOffice>> = () => {
  return <Navigate to={`${ENTITY_LIST_ROUTE}${ENTITIES.POST_OFFICES}`} />;
};
