import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/DashBoard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Auth from '../pages/Auth'
import About from '../pages/About'
import NewBlog from '../pages/NewBlog'
import PrivateRouter from './PrivateRouter'
import MyBlogs from '../pages/MyBlogs'
import Profile from '../pages/Profile'
import Detail from '../pages/Detail'

const AppRouter = () => {

  const [authType, setAuthType] = useState('login')

  return (
    <BrowserRouter>
        <Navbar authType={authType} setAuthType={setAuthType}/>
        <Routes>
            <Route path='/' element={<DashBoard/>}/>
            <Route path='/auth' element={<Auth authType={authType} setAuthType={setAuthType}/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path="/blogs/:id" element={<Detail />} />
            <Route path='' element={<PrivateRouter/>}>
              <Route path='/newblog' element={<NewBlog/>}/>
              <Route path='/myblogs' element={<MyBlogs/>}/>
              <Route path='/profile' element={<Profile/>}/>
            </Route>
  
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default AppRouter