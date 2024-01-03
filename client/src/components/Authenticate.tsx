import { JSX } from 'react';
import { useGetUserDataQuery } from '../api';
import { Loader } from './Loader';

export const Authenticate = ({ children }: { children: JSX.Element }) => {
  const getUserDataRequest = useGetUserDataQuery();

  if (getUserDataRequest.isFetching) return <Loader type="fullscreen" />;

  return children;
};
