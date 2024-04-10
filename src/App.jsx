import React, { useState } from 'react'
import { Routes, Route, Outlet } from "react-router-dom"
import Header from './Components/Header'
import { Footer } from './Components/Footer'
import HomePage from './pages/HomePage/HomePage'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Error from './pages/Error/Error'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Cart from './pages/Cart/Cart'


export default function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  return (
    <div>
     <Routes>
        <Route path='/' element={ <><Header setIsLoad={setIsLoad} isLogin={isLogin} setIsLogin={setIsLogin} /> <Outlet /> <Footer/></>}>
          <Route path="/" element={< HomePage/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
          <Route path="/error" element={< Error/>} />
          <Route path="/contact" element={< Contact/>} />
          <Route path="/about" element={< About/>} />
          <Route path="/cart" element={<Cart/>} />

        </Route>
      </Routes>
    </div>
  )
}
