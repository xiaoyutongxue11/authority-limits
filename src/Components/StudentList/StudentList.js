import React from "react";
import Student from "./Student/Student";
import AddForm from "../AddForm/AddForm";
import { useGetStudentsQuery } from "../../store/api/studentApi";
const StudentList = (props) => {
  const { data, isSuccess } = useGetStudentsQuery();
  return (
    <table>
      <caption>学生列表</caption>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {isSuccess &&
          data.data.map((stu) => <Student key={stu.id} stu={stu} />)}
      </tbody>
      <tfoot>
        <AddForm />
      </tfoot>
    </table>
  );
};

export default StudentList;
