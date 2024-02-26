import React from "react";
import { useState, useRef } from "react";
const AuthForm = () => {
  const usernameInp = useRef();
  const passwordInp = useRef();
  const emailInp = useRef();
  const [isLoginForm, setIsLoginForm] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault();
    const username = usernameInp.current.value;
    const password = passwordInp.current.value;
    console.log("登录", username, password);
    if (isLoginForm) {
    } else {
      const email = emailInp.current.value;
      console.log("注册", username, password, email);
    }
  };
  const changeForm = (e) => {
    e.preventDefault();
    setIsLoginForm((prevState) => !prevState);
  };
  return (
    <div>
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
