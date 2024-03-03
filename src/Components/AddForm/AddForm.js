import React, { useEffect } from "react";
import { useState } from "react";
import {
  useGetStudentByIdQuery,
  useAddStudentMutation,
  useUpdateStudentMutation,
} from "../../store/api/studentApi";
const AddForm = (props) => {
  const [inputData, setInputData] = useState({
    name: "",
    gender: "男",
    age: "",
    address: "",
  });
  const { data, isSuccess } = useGetStudentByIdQuery(props.stuId, {
    skip: !props.stuId,
  });
  const [addStudent, addResult] = useAddStudentMutation();
  const [updataStudent, updateResult] = useUpdateStudentMutation();
  useEffect(() => {
    if (isSuccess) {
      setInputData(data.data.attributes);
    }
  }, [isSuccess]);
  const nameChangeHandler = (e) => {
    setInputData((prevState) => {
      return { ...prevState, name: e.target.value };
    });
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, gender: e.target.value }));
  };
  const ageChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, age: +e.target.value }));
  };
  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, address: e.target.value }));
  };
  const addStudentHandler = () => {
    addStudent(inputData);
    setInputData({ name: "", gender: "男", age: "", address: "" });
  };
  const editStudentHandler = () => {
    updataStudent({
      id: props.stuId,
      attributes: inputData,
    });
    props.onCancel();
  };
  return (
    <>
      <tr>
        <td>
          <input
            type="text"
            onChange={nameChangeHandler}
            value={inputData.name}
          />
        </td>
        <td>
          <select onChange={genderChangeHandler} value={inputData.gender}>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
        <td>
          <input
            type="number"
            onChange={ageChangeHandler}
            value={inputData.age}
          />
        </td>
        <td>
          <input
            type="text"
            onChange={addressChangeHandler}
            value={inputData.address}
          />
        </td>
        <td>
          {props.stuId ? (
            <>
              <button onClick={props.onCancel}>取消</button>
              <button onClick={editStudentHandler}>确认</button>
            </>
          ) : (
            <button onClick={addStudentHandler}>添加</button>
          )}
        </td>
      </tr>
      {/* {loading && (
        <tr>
          <td colSpan={5}>{props.stu ? "正在修改" : "正在添加"}</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>{error.message}</td>
        </tr>
      )} */}
    </>
  );
};

export default AddForm;
