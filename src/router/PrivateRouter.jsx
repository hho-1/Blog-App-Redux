/* import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRouter = () => {

  const {currentUser} = useContext(AuthContext)

  return currentUser ? <Outlet/> : <Navigate to="/login"/>            //context kullansan bu sekilde yapman gerekirdi
}

export default PrivateRouter */


import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const { currentUser } = useSelector(state => state.auth);

  return currentUser ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRouter;