import React from "react";
import classes from "./Student.module.css";
import { useState } from "react";
import AddForm from "../../AddForm/AddForm";
import { useDeleteStudentMutation } from "../../../store/api/studentApi";
const Student = ({ stu: { id, attributes } }) => {
  const { name, gender, age, address } = attributes;
  const [isEdit, setIsEdit] = useState(false);
  const [deleteStudent, result] = useDeleteStudentMutation();
  const delStuHandler = () => {
    deleteStudent(id);
  };
  const cancelEdit = () => {
    setIsEdit(false);
  };
  return (
    <>
      {!isEdit && !result.isSuccess && (
        <tr>
          <td>{name}</td>
          <td>{gender}</td>
          <td>{age}</td>
          <td>{address}</td>
          <td>
            <button onClick={delStuHandler}>删除</button>
            <button onClick={() => setIsEdit(true)}>修改</button>
          </td>
        </tr>
      )}
      {isEdit && <AddForm stuId={id} onCancel={cancelEdit} />}
      {result.isSuccess && (
        <tr>
          <td colSpan={5}>删除成功</td>
        </tr>
      )}
    </>
  );
};

export default Student;
