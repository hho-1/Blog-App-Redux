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
            <Route path='/newblog' element={<PrivateRouter/>}>
              <Route path='' element={<NewBlog/>}/>
            </Route>
            <Route path='/myblogs' element={<PrivateRouter/>}>
              <Route path='' element={<MyBlogs/>}/>
            </Route>
            <Route path="/blogs/:id" element={<PrivateRouter/>}>
              <Route path="" element={<Detail />} />   {/* Path bir üst satirda verildi */}
            </Route>
            <Route path='/profile' element={<PrivateRouter/>}>
              <Route path='' element={<Profile/>}/>
            </Route>
  
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default AppRouter