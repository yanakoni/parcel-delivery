import { UserWithRole } from '../interfaces';
import { ENDPOINTS } from '../consts';
// import shortening causes an error, dependency issue
import { apiSlice } from '../store/slices';

interface LoginResponse {
  success?: boolean;
  code?: string;
  message?: string;
}

interface LoginRequestQuery {
  email: string;
  password: string;
}

interface SignUpBasicRequestQuery {
  first_name: string;
  last_name: string;
  password: string;
}

export interface SignUpWithTokenRequestQuery extends SignUpBasicRequestQuery {
  invite_token: string;
}

export interface SignUpWithoutTokenRequestQuery extends SignUpBasicRequestQuery {
  email: string;
}

type SignUpErrorKeys = 'email' | 'first_name' | 'last_name' | 'password';

interface SignUpResponse {
  data: {
    success?: boolean;
    errors?: { [key in SignUpErrorKeys]: string };
  };
}

export const authorizationApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signUp: builder.mutation<SignUpResponse, SignUpWithTokenRequestQuery | SignUpWithoutTokenRequestQuery>({
        invalidatesTags: ['User'],
        query: (userData) => ({
          url: ENDPOINTS.SIGN_UP.url,
          method: ENDPOINTS.SIGN_UP.method,
          body: userData,
        }),
      }),
      login: builder.mutation<LoginResponse, LoginRequestQuery>({
        invalidatesTags: ['User'],
        query: (credentials) => ({
          url: ENDPOINTS.LOGIN.url,
          method: ENDPOINTS.LOGIN.method,
          body: credentials,
        }),
      }),
      logout: builder.mutation<void, void>({
        invalidatesTags: ['User'],
        query: () => ({
          url: ENDPOINTS.LOGOUT.url,
          method: ENDPOINTS.LOGOUT.method,
        }),
      }),
      getUserData: builder.query<UserWithRole, void>({
        providesTags: ['User'],
        query: () => ({
          url: ENDPOINTS.GET_USER_DATA.url,
          method: ENDPOINTS.GET_USER_DATA.method,
        }),
      }),
    }),
  });

export const { useSignUpMutation, useLoginMutation, useLogoutMutation, useGetUserDataQuery, useLazyGetUserDataQuery } =
  authorizationApi;
