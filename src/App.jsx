import React, { useState } from 'react'
import HomePage from './pages/HomePage/HomePage'
import Error from './pages/Error/Error'
import { Route, Routes } from 'react-router-dom'
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
export default function App() {
  return (
    <Routes>
     <Route path="/" element={<HomePage />}></Route>
     <Route path="/error" element={<Error />}></Route>
     <Route path="/login" element={<Login />}></Route>
     <Route path="/register" element={<Register />}></Route>
    </Routes>
  )
}
