import { configureStore } from "@reduxjs/toolkit";
import authApi from "./api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./reducer/authSlice";
import studentApi from "./api/studentApi";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authSlice.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
  },
  middleware: (getDefaultMiddle) => {
    return getDefaultMiddle().concat(authApi.middleware, studentApi.middleware);
  },
});
setupListeners(store.dispatch);
export default store;
