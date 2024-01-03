import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { showNotification } from '../../utils';
import { BASE_URL } from '../../consts';

export const bq = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  headers: {
    'Content-type': 'application/json',
    Token: localStorage.getItem('token') || '',
  },
});

interface ExtraOptions {
  disableJsonApi?: boolean;
}

type ApiTransformer = (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: ExtraOptions,
) => Promise<{ data: any } | { error: any }>;

const transformJsonApi: ApiTransformer = async (args, api, extraOptions) => {
  const response = await bq(args, api, extraOptions);
  const { error, data } = response;

  if (error && error.status === 401) {
    // TODO: handle unauthorized
    return { error };
  }

  if (error) {
    console.log(error);
    showNotification('Unexpected error', 'error');
    return { error };
  }

  return { data };
};

const transformPlainApi: ApiTransformer = async (args, api, extraOptions) => {
  const response = await bq(args, api, extraOptions);
  const { error, data } = response;

  if (error) {
    showNotification('Unexpected error', 'error');
    return response;
  }

  return { data };
};

export const baseQueryWithJsonApiTransform: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  ExtraOptions
> = async (args, api, extraOptions = {}): Promise<{ data: any } | { error: any }> => {
  const neededTransformer = extraOptions.disableJsonApi ? transformPlainApi : transformJsonApi;

  return await neededTransformer(args, api, extraOptions);
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithJsonApiTransform,
  endpoints: () => ({}),
});
