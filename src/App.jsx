import React, { useState } from 'react'
import HomePage from './pages/HomePage/HomePage'
import Error from './pages/Error/Error'
import { Route, Routes, Outlet } from 'react-router-dom'
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
//
import { TECollapse, TERipple } from "tw-elements-react";
import Favorite from './pages/Favorite/Favorite'
import Products from './pages/Products/Products'
import Checkout from './pages/Checkout/Checkout'
import Contact from './pages/Contact/Contact'
import About from './pages/About/About'
import Cart from './pages/Cart/Cart'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Account from './pages/User/Account'
export default function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  return (

    <Routes>
      <Route path='/' element={<><Header setIsLoad={setIsLoad} isLogin={isLogin} setIsLogin={setIsLogin} /> <Outlet /> <Footer /></>}>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/favor" element={<Favorite />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/contact" element={< Contact />}></Route>
        <Route path="/about" element={< About />}></Route>
        <Route path="/products" element={< Products />}></Route>
        <Route path="/cart" element={< Cart />}></Route>
        <Route path="/account" element={< Account />}></Route>
      </Route>
    </Routes>
  )
}