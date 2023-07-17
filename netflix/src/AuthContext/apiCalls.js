import { axiosInstance } from "../config";
import { loginFaliure, loginStart, loginSuccess } from "./Authactions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axiosInstance.post("auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFaliure());
  }
};
