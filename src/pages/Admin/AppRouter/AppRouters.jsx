import React from "react";
import LayoutAdmin from "../LayoutAdmin/LayoutAdmin";
import AdminUsers from "../AdminUsers/AdminUsers";
import AdminProducts from "../AdminProduct/AdminProducts";
import AdminCategory from "../AdminCategory/AdminCategory";
import AdminBill from "../AdminBill/AdminBill";
import { Outlet, Route, Routes } from "react-router-dom";
import DashBoard from "../Dashboard/DashBoard";
import LoginAdmin from "../Login/LoginAdmin";
import AdminReview from "../AdminReview/AdminReview";
import AdminProductInfo from "../AdminProductInfo/AdminProductInfo";
// import PrivateRouter from "../privateRouter/PrivateRouter";

export default function AppRouters() {
    return (
        <div>
            <Routes>
                <Route path="/auth/admin" element={<LoginAdmin />} />
                <Route
                    path="/"
                    element={
                        <LayoutAdmin>
                            {" "}
                            <Outlet />
                        </LayoutAdmin>
                    }
                >
                    {/* <Route path="/" element={<PrivateRouter />}> */}
                        <Route index path="/dashboard" element={<DashBoard />} />
                        <Route
                            index
                            path="/ad_users"
                            element={<AdminUsers />}
                        />
                        <Route
                            path="/ad_products"
                            element={<AdminProducts />}
                        />
                        <Route
                            path="/ad_category"
                            element={<AdminCategory />}
                        />
                        <Route path="/ad_bill" element={<AdminBill />} />
                        <Route path="/ad_review" element={<AdminReview />} />
                        <Route path="/ad_product_info" element={<AdminProductInfo />} />
                    </Route>
                {/* </Route> */}
            </Routes>
        </div>
    );
}
