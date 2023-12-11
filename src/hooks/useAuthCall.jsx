import axios from "axios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  userUpdateSuccess,
} from "../features/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector(state => state.auth);
  //const { currentUser } = useSelector(state => state.auth);

  const { axiosWithToken } = useAxios();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const login = async userInfo => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      toastSuccessNotify("Login performed");
      navigate("/");
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
        toastErrorNotify("Login can not be performed");
    }
  };

  const logout = async () => {
    dispatch(fetchStart());
    try {
      // let headers = {
      //   Authorization: `Token ${token}`,
      // };
      await axios.post(`${BASE_URL}users/auth/logout/`, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });// post isteği atılırken axios ikinci parametreyi body olarak kabul eder. O nedenle eğer body bilgisi yoksa ikinci parametreye null veya boş obje tanımlanabilir. 3.parametre de headers verileri gönderilir.
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      toastErrorNotify("Logout can not be performed");
    }
  };

  const register = async userInfo => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      //console.log(data);
      toastSuccessNotify("Register performed");
      navigate("/");
    } catch (err) {
      dispatch(fetchFail());
      if (err.response.status === 400) {
        for (const [key, value] of Object.entries(err.response.data)) {
          toastErrorNotify(`${key}: ${value[0]}`);
        }
      } else {
        toastErrorNotify("Register can not be performed");
      }
    }
  };
  const getUser = async () => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken(`${BASE_URL}users/auth/user/`);
      //console.log(data);
      dispatch(userUpdateSuccess({ data })); // {data:data,url:url}
    } catch (error) {
      dispatch(fetchFail());
    }
  };
  const putUserData = async (info) => {
    dispatch(fetchStart())
    try {
      const data = await axiosWithToken.put(`/users/auth/user/`, info)
      getUser()
      toastSuccessNotify(`User successfully updated`)
      dispatch(userUpdateSuccess({ data }));
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify('User can not be updated')
      console.log(error)
    }
  }

  return { login, register, logout, putUserData, getUser };
};

export default useAuthCall;

