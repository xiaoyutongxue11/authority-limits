import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const studentApi = createApi({
  reducerPath: "studentApi", //Api的唯一标识
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:1337/api/", //请求基路径
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log(token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["student"],
  endpoints(build) {
    //包含有关这个Api的所有请求信息，返回值是一个对象
    return {
      //.query()是查询类请求，.mutation()是修改类请求
      getStudents: build.query({
        //有关这个功能的所有细节
        query() {
          return "students"; //请求的子路径
        },
        providesTags: [{ type: "student", id: "list" }],
      }),
      getStudentById: build.query({
        query(id) {
          return `students/${id}`;
        },
        providesTags: (result, error, id) => {
          console.log(result, error, id);
          return [{ type: "student", id }];
        },
      }),
      deleteStudent: build.mutation({
        query(id) {
          return {
            url: `students/${id}`,
            method: "delete",
          };
        },
      }),
      addStudent: build.mutation({
        query(stu) {
          return {
            url: "students",
            method: "post",
            body: { data: stu },
          };
        },
        invalidatesTags: [{ type: "student", id: "list" }],
      }),
      updateStudent: build.mutation({
        query(stu) {
          return {
            url: `students/${stu.id}`,
            method: "put",
            body: { data: stu.attributes },
          };
        },
        invalidatesTags: (result, error, stu) => {
          return [
            { type: "student", id: stu.id },
            { type: "student", id: "list" },
          ];
        },
      }),
    };
  },
});
//钩子函数是studentApi对象自动生成的
export const {
  useGetStudentsQuery,
  useGetStudentByIdQuery,
  useDeleteStudentMutation,
  useAddStudentMutation,
  useUpdateStudentMutation,
} = studentApi;
export default studentApi;
