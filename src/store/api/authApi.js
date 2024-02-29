import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api",
  }),
  endpoints(build) {
    return {
      register: build.mutation({
        query(user) {
          return {
            url: "auth/local/register",
            method: "post",
            body: user,
          };
        },
      }),
      login: build.mutation({
        query(user) {
          return {
            url: "auth/local",
            method: "post",
            body: user,
          };
        },
      }),
    };
  },
});
export const { useRegisterMutation, useLoginMutation } = authApi;
export default authApi;
