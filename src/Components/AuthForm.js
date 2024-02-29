import React from "react";
import { useState, useRef } from "react";
import { useRegisterMutation, useLoginMutation } from "../store/api/authApi";
import { useDispatch } from "react-redux";
import { loginHandler } from "../store/reducer/authSlice";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
  const usernameInp = useRef();
  const passwordInp = useRef();
  const emailInp = useRef();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [regist, { error: registError }] = useRegisterMutation();
  const [login, { error: loginError }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const username = usernameInp.current.value;
    const password = passwordInp.current.value;
    if (isLoginForm) {
      login({
        identifier: username,
        password,
      }).then((res) => {
        if (!res.error) {
          dispatch(
            loginHandler({
              token: res.data.jwt,
              user: res.data.user,
            })
          );
          navigate("/", { replace: true });
        }
      });
    } else {
      const email = emailInp.current.value;
      regist({
        username,
        password,
        email,
      }).then((res) => {
        if (!res.error) {
          setIsLoginForm(true);
        }
      });
    }
  };
  const changeForm = (e) => {
    e.preventDefault();
    setIsLoginForm((prevState) => !prevState);
  };
  return (
    <div>
      {isLoginForm ? (
        <p style={{ color: "red" }}>
          {loginError && loginError.data.error.message}
        </p>
      ) : (
        <p style={{ color: "red" }}>
          {registError && registError.data.error.message}
        </p>
      )}
      <form onSubmit={submitHandler}>
        {<h1>{isLoginForm ? "登录" : "注册"}</h1>}
        <div>
          <input ref={usernameInp} type="text" placeholder="用户名" />
        </div>
        <div>
          <input ref={passwordInp} type="text" placeholder="密码" />
        </div>
        {!isLoginForm && (
          <div>
            <input ref={emailInp} type="text" placeholder="电子邮箱" />
          </div>
        )}
        <button>提交</button>
        <a href="" onClick={changeForm}>
          {isLoginForm ? "没有账号，点击注册" : "已有账号，点击登录"}
        </a>
      </form>
    </div>
  );
};

export default AuthForm;
