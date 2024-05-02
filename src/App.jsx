import React, { useEffect, useState } from 'react'
import HomePage from './pages/HomePage/HomePage'
import Error from './pages/Error/Error'
import { Route, Routes, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
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
import ResetPassword from './pages/Reset_Password/ResetPassword';
import ProductCatergory from './pages/ProductCatergory/ProductCatergory'
import Bills from './pages/Bills/Bills'

import LoginAdmin from './pages/Admin/Login/LoginAdmin.jsx'
import LayoutAdmin from './pages/Admin/LayoutAdmin/LayoutAdmin.jsx'
import DashBoard from './pages/Admin/Dashboard/DashBoard.jsx'
import AdminUsers from './pages/Admin/AdminUsers/AdminUsers.jsx'
import AdminProducts from './pages/Admin/AdminProduct/AdminProducts.jsx'
import AdminCategory from './pages/Admin/AdminCategory/AdminCategory.jsx'
import AdminBill from './pages/Admin/AdminBill/AdminBill.jsx'
import AdminReview from './pages/Admin/AdminReview/AdminReview.jsx'
import AdminProductInfo from './pages/Admin/AdminProductInfo/AdminProductInfo.jsx'

import i18n from './i18n.js';
import { languages } from './helper/language.js';

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    const [language, setLanguage] = useState(i18n.language);
    const handleChangeLanguage = (value) => {
        // setLanguage(value)
        // const [language, ...path] = location.pathname.slice(1).split("/");
        // if (language in languages) {
        //     navigate(
        //         {
        //             ...location,
        //             pathname: `/${[value, ...path].join("/")}`
        //         },
        //         { replace: true }
        //     )
        // }
    }
    useEffect(() => {
        const language = location.pathname.slice(1).split("/")[0];
        if (language in languages) {
            i18n.changeLanguage(language)
            setLanguage(language)
        }
    }, [location.pathname])
    return (
        <Routes>
            {/* <Route path=":language"> */}
                <Route
                    element={
                        <>
                            <Header
                                setIsLoad={setIsLoad}
                                isLogin={isLogin}
                                setIsLogin={setIsLogin}
                                handleChangeLanguage={handleChangeLanguage}
                                // language={language}
                            />
                            <Outlet /> <Footer />
                            <ScrollTop />{" "}
                        </>
                    }
                >
                    {/* Add ScrollTop component here */}
                    <Route path="home" element={<HomePage />}></Route>
                    <Route path="error" element={<Error />}></Route>
                    <Route path="login" element={<Login setIsLogin={setIsLogin} />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="favor" element={<Favorite />}></Route>
                    <Route path="checkout" element={<Checkout />}></Route>
                    <Route path="contact" element={<Contact />}></Route>
                    <Route path="about" element={<About />}></Route>
                    <Route path="products" element={<Products />}></Route>
                    <Route path="cart" element={<Cart />}></Route>
                    <Route path="account" element={<Account />}></Route>
                    <Route path="payment" element={<Payment />}></Route>
                    <Route path="bills" element={<Bills />}></Route>
                    <Route path="reset_password" element={<ResetPassword />}></Route>
                    <Route path="category/:id" element={<ProductCatergory isLoad={isLoad} />}></Route>
                    <Route path="product_detail/:id" element={<Detail />}></Route>
                    {/* admin */}
                    {/* {<Route path="auth/admin" element={<LoginAdmin />} />} */}
                    
                </Route>
            {/* </Route> */}
        </Routes>
    );
}

