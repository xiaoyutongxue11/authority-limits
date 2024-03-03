import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        isLogined: false,
        token: null,
        user: null,
        expirationTime: 0,
      };
    }
    return {
      isLogined: true,
      token,
      user: JSON.parse(localStorage.getItem("user")),
      expirationTime: +localStorage.getItem("expirationTime"),
    };
  },
  reducers: {
    loginHandler(state, action) {
      state.isLogined = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      const currentTime = Date.now();
      const timeout = 1000 * 60 * 60 * 24 *7;
      state.expirationTime = currentTime + timeout;
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("expirationTime", state.expirationTime);
    },
    logoutHandler(state) {
      state.isLogined = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expirationTime");
    },
  },
});
export const { loginHandler, logoutHandler } = authSlice.actions;
export default authSlice;
