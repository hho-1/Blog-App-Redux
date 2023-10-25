//import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, contributionsSuccess } from "../features/blogSlice";
//import axios from "axios";
//import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useBlogCall = () => {
  const dispatch = useDispatch();
  //const { token } = useSelector(state => state.auth);

  const { axiosWithPublic } = useAxios();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

    const getContributions = async () => {
      dispatch(fetchStart());
      try {
        const url = "blogs";
        const { data } = await axiosWithPublic(`${BASE_URL}api/${url}/`);
        //console.log(data);
        dispatch(contributionsSuccess({ data, url })); // {data:data,url:url}
      } catch (error) {
        dispatch(fetchFail());
      }
    };
    /* const getContributions = async () => {
      dispatch(fetchStart());
      try {
        const url = "blogs";
        const { data } = await axios(`${BASE_URL}api/${url}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        console.log(data);
        // dispatch(getSuccess({data, url:"firms"}))
        dispatch(getSuccess({ data, url })); // {data:data,url:url}
      } catch (error) {
        dispatch(fetchFail());
      }
    }; */
  
  
  //! istek atarken ortak olan base_url  ve token gibi değerleri her seferinde yazmak yerine axios instance kullanarak bunları orada tanımlıyoruz. Ve sonrasında sadece istek atmak istediğimiz end pointi yazmamız yeterli oluyor.
  /* const deleteStockData = async (url, id) => {
    dispatch(fetchStart());
    try {
      // await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: {
      //     Authorization: `Token ${token}`,
      //   },
      // });
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      getStockData(url);
      toastSuccessNotify(`${url} successfuly deleted!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly deleted!`);
    }
  }; */

  /* const postStockData = async (url,info) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosWithToken.post(`stock/${url}/`,info);

      getStockData(url);
      toastSuccessNotify(`${url} successfuly created!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly created!`);
    }
  }; */

  /* const putStockData = async (url, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);

      getStockData(url);
      toastSuccessNotify(`${url} successfuly updated!`);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly updated!`);
    }
  }; */

  return {
    // getFirms,
    //  getBrands,
    getContributions,
    // deleteStockData,
    // postStockData,
    // putStockData,
  };
};

export default useBlogCall;