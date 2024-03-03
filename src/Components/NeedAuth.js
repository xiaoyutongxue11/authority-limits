import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const NeedAuth = (props) => {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  return auth.isLogined ? (
    props.children
  ) : (
    <Navigate to={"/authform"} replace state={{ preLocation: location }} />
  );
};

export default NeedAuth;
