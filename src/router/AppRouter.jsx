import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DashBoard from '../pages/DashBoard'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path='/' element={<DashBoard/>}/>
        </Routes>
        <Footer/>
    </BrowserRouter>
  )
}

export default AppRouter