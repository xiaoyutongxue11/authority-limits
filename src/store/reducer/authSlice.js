import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogined: false,
    token: null,
    user: null,
  },
  reducers: {
    loginHandler(state, action) {
      state.isLogined = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logoutHandler(state) {
      state.isLogined = false;
      state.token = null;
      state.user = null;
    },
  },
});
export const { loginHandler, logoutHandler } = authSlice.actions;
export default authSlice;
