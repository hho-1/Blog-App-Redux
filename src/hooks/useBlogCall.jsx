//import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, contributionsSuccess, getCategoriesSuccess, getCommentsSuccess, getUsersSuccess, getStatusSuccess, getLikesSuccess, getLikesNumSuccess, getDislikesNumSuccess } from "../features/blogSlice";
//import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";


const useBlogCall = () => {
  const dispatch = useDispatch();
  //const { token } = useSelector(state => state.auth);

  const { axiosWithPublic, axiosWithToken } = useAxios();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

    const getContributions = async () => {
      dispatch(fetchStart());
      try {
        const url = "blogs";
        const { data } = await axiosWithPublic(`${BASE_URL}/${url}`);
        //console.log(data);
        dispatch(contributionsSuccess({ data, url })); // {data:data,url:url}
      } catch (error) {
        dispatch(fetchFail());
      }
    };
    const getComments = async () => {
      dispatch(fetchStart());
      try {
        const url = "comments";
        const { data } = await axiosWithPublic.get(`${BASE_URL}/${url}`);
        //console.log(data);
        dispatch(getCommentsSuccess({ data, url })); // {data:data,url:url}
      } catch (error) {
        dispatch(fetchFail());
      }
    };
    const getCategories = async () => {
      dispatch(fetchStart());
      try {
        const url = "categories";
        const { data } = await axiosWithPublic.get(`${BASE_URL}/${url}`);
        //console.log(data);
        dispatch(getCategoriesSuccess({ data, url })); // {data:data,url:url}
      } catch (error) {
        dispatch(fetchFail());
      }
    };
    const getUsers = async () => {
      dispatch(fetchStart());
      try {
        const url = "users";
        const { data } = await axiosWithPublic.get(`${BASE_URL}/${url}`);
        //console.log(data);
        dispatch(getUsersSuccess({ data, url })); // {data:data,url:url}
      } catch (error) {
        dispatch(fetchFail());
      }
    };
    const getStatus = async () => {
      dispatch(fetchStart());
      try {
        const url = "status";
        const { data } = await axiosWithPublic.get(`${BASE_URL}/${url}`);
        //console.log(data);
        dispatch(getStatusSuccess({ data, url })); // {data:data,url:url}
      } catch (error) {
        dispatch(fetchFail());
      }
    };
    const getLikes = async () => {
      dispatch(fetchStart());
      try {
        const url = "likes";
        const { data } = await axiosWithPublic.get(`${BASE_URL}/${url}`);
        //console.log(data);
        dispatch(getLikesSuccess({ data, url })); // {data:data,url:url}
      } catch (error) {
        dispatch(fetchFail());
      }
    };
  
  
  //! istek atarken ortak olan base_url  ve token gibi değerleri her seferinde yazmak yerine axios instance kullanarak bunları orada tanımlıyoruz. Ve sonrasında sadece istek atmak istediğimiz end pointi yazmamız yeterli oluyor.


  const postBlogData = async (url ,info) => {
    dispatch(fetchStart());
    console.log(info);
    try {                                   
      //const url = "blogs";
      const { data } = await axiosWithToken.post(`/${url}`, info);

      console.log(info);
      getContributions();
      
      toastSuccessNotify(`${url} successfuly created!`);
      dispatch(contributionsSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly created!`);
    }
  };
  const postCommentData = async (url ,info) => {
    dispatch(fetchStart());
    console.log(info);
    try {                                   
      //const url = "comments";
      const { data } = await axiosWithToken.post(`/${url}`, info);

      //console.log(url);
      getComments();
      
      toastSuccessNotify(`${url} successfuly created!`);
      dispatch(getCommentsSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly created!`);
    }
  };
  const postLikesData = async (url ,info) => {
    dispatch(fetchStart());
    //console.log(info);
    try {                                   
      //const url = "comments";
      console.log(info);
      await axiosWithPublic.post(`/${url}`, info);

      getContributions();
      getLikes()
    
      //dispatch(getLikesSuccess({ data, url })); Bunu sildik cünkü likes sayisi teke düstügünde data'yi objeye ceviriyordu. Öyle olunca da likes'a filter yapamiyoruz
    } catch (error) {
      dispatch(fetchFail());
      
    }
  };
  const deleteLikesData = async (url, id) => {
    dispatch(fetchStart())
    try {
      await axiosWithPublic.delete(`/${url}/${id}`)
      
      getContributions()
      getLikes()
    } catch (error) {
      dispatch(fetchFail())
      
      console.log(error)
    }
  }
  const postLikesNumData = async (url ,info) => {
    dispatch(fetchStart());
    console.log(info);
    try {                                   
      //const url = "comments";
      const { data } = await axiosWithPublic.post(`/${url}`, info);

      //console.log(url);
      getComments();
      
      toastSuccessNotify(`${url} successfuly created!`);
      dispatch(getLikesNumSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly created!`);
    }
  };
  const postDislikesNumData = async (url ,info) => {
    dispatch(fetchStart());
    console.log(info);
    try {                                   
      //const url = "comments";
      const { data } = await axiosWithPublic.post(`/${url}`, info);

      //console.log(url);
      getComments();
      
      toastSuccessNotify(`${url} successfuly created!`);
      dispatch(getDislikesNumSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify(`${url} not successfuly created!`);
    }
  };



  const putBlogData = async (url, info) => {
    dispatch(fetchStart())
    try {
      const data = await axiosWithToken.put(`/${url}/${info.id}`, info)
      getContributions()
      toastSuccessNotify(`${url} succesfuly updated`)
      dispatch(contributionsSuccess({ data, url }));
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} can not be updated`)
      console.log(error)
    }
  }
  const deleteBlogData = async (url, id) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.delete(`/${url}/${id}`)
      toastSuccessNotify(`${url} succesfuly deleted`)
      getContributions()
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify(`${url} can not be deleted`)
      console.log(error)
    }
  }


  return {
  
    getContributions,
    getCategories,
    postBlogData,
    postCommentData,
    postLikesData,
    deleteLikesData,
    postLikesNumData,
    postDislikesNumData,
    putBlogData,
    getComments,
    getLikes,
    getStatus,
    getUsers,
    deleteBlogData
    
  };
};

export default useBlogCall;