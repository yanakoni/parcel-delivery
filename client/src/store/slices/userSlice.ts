import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserWithRole } from '../../interfaces';
import { authorizationApi } from '../../api';
import type { RootState } from '../store';

export interface UserState {
  user: UserWithRole | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, action: PayloadAction<UserWithRole | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authorizationApi.endpoints.getUserData.matchFulfilled,
      (state, { payload }) => {
        state.user = payload;
      },
    );

    builder.addMatcher(
      authorizationApi.endpoints.logout.matchFulfilled,
      (state) => {
        state.user = null;
      },
    );
  },
});

export const { logout, setUser } = userSlice.actions;

const selectUserSlice = (state: RootState) => state.user;

export const selectUser = createSelector(
  [selectUserSlice],
  (userState: UserState) => {
    return userState.user;
  },
);

export const userReducer = userSlice.reducer;
