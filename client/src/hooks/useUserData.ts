import { useContext } from 'react';
import { UserContext } from '../contexts/userContext';

export const useUserData = () => {
  return useContext(UserContext);
};
