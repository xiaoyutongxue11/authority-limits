import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  return (
    <div>
      <h2>用户信息页面</h2>
      <p>该页面只有登陆后才能查看</p>
      <p>
        {/* {auth.user.username}---{auth.user.email} */}
      </p>
    </div>
  );
};

export default Profile;
