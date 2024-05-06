import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "antd";
import publicAxios from "../../config/publicAxios";
import { formatCurrency } from "../../helper/formatMoney";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const { Option } = Select;
export default function Checkout() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);
    const [cartUser, setCartUser] = useState([]);
    const [provinceCode, setProvinceCode] = useState();
    const [districtCode, setDistrictCode] = useState();
    const [wardCode, setWardCode] = useState();
    const user_id = JSON.parse(localStorage.getItem("user_login")).user_id;
    const [funcPrice, setFuncPrice] = useState(0);
    // console.log(user_id)
    const [handleChange, setHandleChange] = useState("");
    //
    const [address, setAddress] = useState({
        provinceCode: -1,
        districtCode: -1,
        wardCode: -1,
    });
    //
    const getProvinces = async () => {
        let result = await axios.get("https://vapi.vnappmob.com/api/province/");
        // console.log(result.data.results);
        setProvinces(result.data.results);
    };
    const navigate = useNavigate();
    const handleSelectProvince = async (e) => {
        const selectedProvinceCode = e.target.value;
        const selectedProvince = provinces.find(
            (item) => item.province_id === selectedProvinceCode
        );
        let result = await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${selectedProvinceCode}`
        );
        console.log("district", result.data.results);
        setProvinceCode(selectedProvinceCode);
        // console.log(provinceCode)
        setDistricts(result.data.results);
        setDistrictCode(-1);
        setWards([]);
        setWardCode(-1);
        setAddress((prevAddress) => ({
            ...prevAddress,
            provinceCode: selectedProvinceCode,
            provinceName: selectedProvince.province_name, // Lưu trữ tên tỉnh/thành phố
        }));
    };

    const handleSelectDistrict = async (e) => {
        const selectedDistrictCode = +e.target.value;
        const selectedDistrict = districts.find(
            (item) => item.district_id == selectedDistrictCode
        );

        let result = await axios.get(
            `https://vapi.vnappmob.com/api/province/ward/${selectedDistrictCode}`
        );

        setDistrictCode(selectedDistrictCode);
        setWards(result.data.results);
        setWardCode(-1);

        setAddress((prevAddress) => ({
            ...prevAddress,
            districtCode: selectedDistrictCode,
            districtName: selectedDistrict.district_name  // Lưu trữ tên quận/huyện (nếu có)
        }));
    };

    const handleSelectWard = (e) => {
        const selectedWardCode = e.target.value;
        const selectedWard = wards.find(
            (item) => item.ward_id === selectedWardCode
        );
        setAddress((prevAddress) => ({
            ...prevAddress,
            wardCode: selectedWardCode,
            wardName: selectedWard.ward_name, // Lưu trữ tên phường/xã
        }));
    };
    // const total_price = () => {

    //     // console.log(result)
    //     setFuncPrice(result);
    // };

    console.log(address);

    const handleGetCartUser = async () => {
        const res = await publicAxios.get(`/api/v1/cart/list/${user_id}`);
        setCartUser(res.data);
        console.log(cartUser);
        console.log(res.data);
    };
    const totalPrice = () => {
        const result = cartUser.reduce((total, current) => {
            const discountedPrice = current.product_id.price * (1 - parseFloat(current.product_id.discount));
            const totalPrice = discountedPrice * current.quantity;
            return total + totalPrice;
        }, 0);
        setFuncPrice(result);

    }
    useEffect(() => {
        totalPrice();
    }, [cartUser]);
    useEffect(() => {
        getProvinces();
        handleGetCartUser();
    }, []);

    const handleClearCart = async () => {
        try {
            const res = await publicAxios.delete(`/api/v1/cart/${user_id}`);
            console.log(res);
            setCartUser([]);
            message.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const changeInput = (e) => {
        setHandleChange({
            ...handleChange,
            [e.target.name]: e.target.value,
        });
        // console.log(handleChange)
    };

    console.log(funcPrice);

    console.log(cartUser);
    // console.log(handleChange?.fullname);
    const handleCheckout = async () => {
        const data = {
            address: `${address.wardName}, ${address.districtName}, ${address.provinceName}  `,
            total_price: funcPrice,
            phone: handleChange.phone,
            receiver_email: handleChange.email,
            fullname: handleChange.fullname,
        };
        try {
            const res = await publicAxios.post(
                `api/v1/bills/check-out/${user_id}`,
                data
            );
            console.log(res)
            if (res.status === 201) {
                message.success("Checkout successful");
                navigate("/bills");
                handleClearCart()
            } else {
                message.error("Checkout failed");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className="lg:px-28 lg:py-20 px-4 py-2">
                <div className="md:flex flex-col gap-y-20">
                    <div className="flex flex-col gap-y-6">
                        <div className="text-4xl">Billing Details</div>
                        <div className="flex flex-col md:flex-row gap-20">
                            <div className="md:w-1/2 md:order-1 order-2">
                                <div className="flex flex-col">
                                    <div className="flex flex-col pb-4 gap-y-1">
                                        <label htmlFor="">Full Name</label>
                                        <input
                                            type="text"
                                            className="px-2.5 py-2 bg-slate-100 rounded"
                                            onChange={changeInput}
                                            name="fullname"
                                        />
                                    </div>
                                    <div className="flex flex-col pb-4 gap-y-1">
                                        <label htmlFor="">Phone Number</label>
                                        <input
                                            type="text"
                                            className="px-2.5 py-2 bg-slate-100 rounded"
                                            name="phone"
                                            onChange={changeInput}
                                        />
                                    </div>
                                    <div className="flex flex-col pb-4 gap-y-1">
                                        <label htmlFor="">Email Address</label>
                                        <input
                                            type="text"
                                            className="px-2.5 py-2 bg-slate-100 rounded"
                                            name="email"
                                            onChange={changeInput}
                                        />
                                    </div>

                                    <div className="flex flex-row justify-between pb-4 gap-x-4">
                                        {" "}
                                        {/* Adjust the gap-x-4 to a smaller value as needed */}
                                        <div className="flex flex-col gap-y-2 w-full">
                                            <label htmlFor="province">
                                                Province/City
                                            </label>
                                            <select
                                                onChange={handleSelectProvince}
                                                value={provinceCode}
                                                className="px-2.5 py-2 bg-slate-100 rounded w-full"
                                                id="province"
                                            >
                                                <option
                                                    disabled
                                                    selected
                                                    value={-1}
                                                >
                                                    Select province
                                                </option>
                                                {provinces.map(
                                                    (item, index) => (
                                                        <option
                                                            key={index}
                                                            value={
                                                                item.province_id
                                                            }
                                                        >
                                                            {item.province_name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-y-2 w-full">
                                            <label htmlFor="district">
                                                District
                                            </label>
                                            <select
                                                onChange={handleSelectDistrict}
                                                value={address.districtCode}
                                                className="px-2.5 py-2 bg-slate-100 rounded w-full"
                                                id="district"
                                                disabled={!address.provinceCode}
                                            >
                                                <option disabled value={-1}>
                                                    Select district
                                                </option>
                                                {districts.map(
                                                    (item, index) => (
                                                        <option
                                                            key={index}
                                                            value={
                                                                item.district_id
                                                            }
                                                        >
                                                            {item.district_name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-y-2 w-full">
                                            <label htmlFor="ward">Ward</label>
                                            <select
                                                onChange={handleSelectWard}
                                                value={address.wardCode}
                                                className="px-2.5 py-2 bg-slate-100 rounded w-full"
                                                id="ward"
                                                disabled={
                                                    !address.districtCode ||
                                                    address.districtCode === -1
                                                }
                                            >
                                                <option disabled value={-1}>
                                                    Select ward
                                                </option>
                                                {wards.map((item, index) => (
                                                    <option
                                                        key={index}
                                                        value={item.ward_id}
                                                    >
                                                        {item.ward_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-1/2 md:order-2 order-1">
                                <div className="flex flex-col gap-y-2 py-2">
                                    <div className="md:w-11/12 flex flex-col gap-y-2">
                                        <div className="cartUser">
                                            {cartUser.map((item, index) => (
                                                <div key={index + 1}>
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex gap-2 items-center mb-10">
                                                            <img
                                                                src={
                                                                    item
                                                                        .product_id
                                                                        .default_image
                                                                }
                                                                alt=""
                                                                className="w-1/6 h-full "
                                                            />
                                                            <div>
                                                                {
                                                                    item
                                                                        .product_id
                                                                        .product_name
                                                                }{" "}
                                                                x{" "}
                                                                {item.quantity}
                                                            </div>
                                                        </div>
                                                        <div>
                                                            {formatCurrency(+(item.product_id.price) * (1 - parseFloat(item.product_id.discount)))}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div>
                                                <div className="flex justify-between py-2 border-b border-black">
                                                    <div>Subtotal:</div>
                                                    <div>
                                                        {formatCurrency(funcPrice)}
                                                    </div>
                                                </div>
                                                <div className="flex justify-between py-2 border-b border-black">
                                                    <div>Shipping:</div>
                                                    <div>Free</div>
                                                </div>
                                                <div className="flex justify-between py-2">
                                                    <div>Total:</div>
                                                    <div>
                                                        {formatCurrency(
                                                            funcPrice
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                       
                                    </div>
                                    
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="bg-red-600 text-white py-2.5 px-10 text-sm rounded"
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
