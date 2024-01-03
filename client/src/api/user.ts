import { apiSlice } from '../store';
import { ENDPOINTS } from '../consts';

interface ResetPasswordResponse {
  success?: boolean;
  code?: string;
  message?: string;
}

interface ResetPasswordRequestQuery {
  email: string;
}

type ChangePasswordResponse = [string];

interface ChangePasswordRequestQuery {
  token: string | null;
  password: string;
}

type UpdatePasswordResponse = {
  success?: boolean;
};

interface UpdatePasswordRequestQuery {
  currentPassword: string;
  password: string;
}

type UpdateUserDataResponse = {
  data: any;
};

interface UpdateUserDataRequestQuery {
  firstName: string;
  lastName: string;
  settings: {
    preferences: {
      locale: string;
      tableItemsCount: number;
    };
    profile: {
      avatar: string | null;
    };
  };
}

const authorizationApi = apiSlice
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequestQuery>({
        query: (userData) => ({
          url: ENDPOINTS.RESET_PASSWORD.url,
          method: ENDPOINTS.RESET_PASSWORD.method,
          body: userData,
        }),
      }),
      changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordRequestQuery>({
        query: (userData) => ({
          url: ENDPOINTS.CHANGE_PASSWORD.url,
          method: ENDPOINTS.CHANGE_PASSWORD.method,
          body: userData,
        }),
      }),
      updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordRequestQuery>({
        query: (userData) => ({
          url: ENDPOINTS.UPDATE_PASSWORD.url,
          method: ENDPOINTS.UPDATE_PASSWORD.method,
          body: userData,
        }),
      }),
      updateProfile: builder.mutation<UpdateUserDataResponse, UpdateUserDataRequestQuery>({
        query: (userData) => ({
          url: ENDPOINTS.PATCH_USER_DATA.url,
          method: ENDPOINTS.PATCH_USER_DATA.method,
          body: userData,
        }),
        invalidatesTags: () => ['User'],
      }),
    }),
  });

export const {
  useResetPasswordMutation,
  useChangePasswordMutation,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} = authorizationApi;
