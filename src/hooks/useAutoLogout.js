import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutHandler } from "../store/reducer/authSlice";
const useAutoLogout = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const timeout = auth.expirationTime - Date.now();
    if (timeout < 4000) {
      dispatch(logoutHandler());
      return;
    }
    const timer = setTimeout(() => {
      dispatch(logoutHandler());
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [auth]);
};
export default useAutoLogout;
