import axios from "axios";
import {
  loginFailded,
  loginStart,
  loginSuccess,
  logoutFailded,
  logoutStart,
  logoutSuccess,
} from "./authSlice";
import {
  getEmloyeesFailed,
  getEmloyeesStart,
  getEmloyeesSuccess,
} from "./employeeSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart);
  try {
    const res = await axios.post("/api/v1/user/login", user);
    dispatch(loginSuccess(res.data));
    navigate("/admin");
  } catch (error) {
    dispatch(loginFailded);
  }
};

export const logoutUser = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailded());
    console.log(error);
  }
};

export const getAllEmloyees = async (dispatch, accessToken) => {
  dispatch(getEmloyeesStart());
  try {
    const res = await axios.get("/api/v1/employee", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(getEmloyeesSuccess(res.data));
  } catch (error) {
    dispatch(getEmloyeesFailed());
    console.log(error);
  }
};
