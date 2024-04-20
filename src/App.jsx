
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
import Detail from './pages/ProductDetail/Detail'
import ScrollTop from './Components/ScrollTop'
import { Payment } from './pages/Payment/Payment'

export default function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  return (
      <Routes>
          <Route
              element={
                  <>
                      <Header
                          setIsLoad={setIsLoad}
                          isLogin={isLogin}
                          setIsLogin={setIsLogin}
                      />
                      <Outlet /> <Footer />
                      <ScrollTop />{" "}
                  </>
              }
          >
              {/* Add ScrollTop component here */}
              <Route path="/home" element={<HomePage />}></Route>
              <Route path="/error" element={<Error />}></Route>
              <Route path="/login" element={<Login setIsLogin={setIsLogin} />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/favor" element={<Favorite />}></Route>
              <Route path="/checkout" element={<Checkout />}></Route>
              <Route path="/contact" element={<Contact />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/products" element={<Products />}></Route>
              <Route path="/cart" element={<Cart />}></Route>
              <Route path="/account" element={<Account />}></Route>
              <Route path="/payment" element={<Payment />}></Route>
              <Route path="/product_detail/:id" element={<Detail />}></Route>
          </Route>
      </Routes>
  );
}