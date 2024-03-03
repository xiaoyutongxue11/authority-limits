import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutHandler } from "../store/reducer/authSlice";
const MainMenu = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>主页</Link>
        </li>
        {auth.isLogined && (
          <>
            <li>
              <Link to={"/profile"}>用户信息</Link>
            </li>
            <li>
              <Link to={"/student"}>学生信息</Link>
            </li>
            <li>
              <Link to={"/"} onClick={() => dispatch(logoutHandler())}>
                登出
              </Link>
            </li>
          </>
        )}
        {!auth.isLogined && (
          <li>
            <Link to={"/authform"}>登录/注册</Link>
          </li>
        )}
      </ul>
    </header>
  );
};

export default MainMenu;
