import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  permissions: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token, permissions } = action.payload;
      state.user = user;
      state.token = token;
      state.permissions = permissions;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.permissions = [];
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentUserPermissions = (state) => state.auth.permissions;
