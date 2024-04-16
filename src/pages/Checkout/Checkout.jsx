import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Select } from 'antd';
const { Option } = Select;
export default function Checkout() {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [provinceCode, setProvinceCode] = useState()
    const [districtCode, setDistrictCode] = useState()
    const [wardCode, setWardCode] = useState()


    const getProvinces = async () => {
        let result = await axios.get("https://vapi.vnappmob.com/api/province/");
        console.log(result.data.results);
        setProvinces(result.data.results);
    }

    const handleSelectProvince = async (e) => {
        const provinceCode = e.target.value;
        let result = await axios.get(`https://vapi.vnappmob.com/api/province/district/${provinceCode}`);
        console.log("district", result.data.results);
        setProvinceCode(provinceCode)
        setDistricts(result.data.results)
        setDistrictCode(-1)
        setWards([])
        setWardCode(-1)
    }

    const handleSelectDistrict = async (e) => {
        const districtCode = +(e.target.value);
        let result = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${districtCode}`);
        console.log("ward", result.data.results);
        setDistrictCode(districtCode)
        setWards(result.data.results)
        setWardCode(-1)
    }
    useEffect(() => {
        getProvinces();
    }, [])
    return (
        <div>
            <div className='lg:px-28 lg:py-20 px-4 py-2'>
                <div className='md:flex flex-col gap-y-20'>
                    <div className='hidden md:inline-block'>Account / My Account / Product / View Cart / CheckOut</div>
                    <div className='flex flex-col gap-y-6'>
                        <div className='text-4xl'>Billing Details</div>
                        <div className='flex flex-col md:flex-row gap-20'>
                            <div className='md:w-1/2 md:order-1 order-2'>
                                <div className='flex flex-col'>
                                    <div className='flex flex-col pb-4 gap-y-1'>
                                        <label htmlFor="">Full Name</label>
                                        <input type="text" className='px-2.5 py-2 bg-slate-100 rounded' />
                                    </div>
                                    <div className='flex flex-col pb-4 gap-y-1'>
                                        <label htmlFor="">Phone Number</label>
                                        <input type="text" className='px-2.5 py-2 bg-slate-100 rounded' />
                                    </div>
                                    <div className='flex flex-col pb-4 gap-y-1'>
                                        <label htmlFor="">Email Address</label>
                                        <input type="text" className='px-2.5 py-2 bg-slate-100 rounded' />
                                    </div>

                                    <div className='flex flex-row justify-between pb-4 gap-x-4'> {/* Adjust the gap-x-4 to a smaller value as needed */}
                                        <div className='flex flex-col gap-y-2 w-full'>
                                            <label htmlFor="province">Province/City</label>
                                            <select
                                                onChange={handleSelectProvince}
                                                value={provinceCode}
                                                className='px-2.5 py-2 bg-slate-100 rounded w-full'
                                                id="province"
                                            >
                                                <option disabled selected value={-1}>Select province</option>
                                                {provinces.map((item, index) => (
                                                    <option key={index} value={item.province_id}>{item.province_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col gap-y-2 w-full'>
                                            <label htmlFor="district">District</label>
                                            <select
                                                onChange={handleSelectDistrict}
                                                value={districtCode}
                                                className='px-2.5 py-2 bg-slate-100 rounded w-full'
                                                id="district"
                                                disabled={!provinceCode || provinceCode === -1}
                                            >
                                                <option disabled selected value={-1}>Select district</option>
                                                {districts.map((item, index) => (
                                                    <option key={index} value={item.district_id}>{item.district_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='flex flex-col gap-y-2 w-full'>
                                            <label htmlFor="ward">Ward</label>
                                            <select
                                                onChange={(e) => setWardCode(e.target.value)}
                                                value={wardCode}
                                                className='px-2.5 py-2 bg-slate-100 rounded w-full'
                                                id="ward"
                                                disabled={!districtCode || districtCode === -1}
                                            >
                                                <option disabled selected value={-1}>Select ward</option>
                                                {wards.map((item, index) => (
                                                    <option key={index} value={item.ward_id}>{item.ward_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='flex flex-col pb-4 gap-y-1'>
                                        <label htmlFor="">Note</label>
                                        <textarea placeholder='Additional notes (Example: Delivery during office hours)' type="text" className='px-2.5 py-2 bg-slate-100 rounded' />
                                    </div>


                                </div>
                                <div className='flex gap-1'>
                                    <input type="checkbox" />
                                    <p>Save this information for faster check-out next time</p>
                                </div>
                            </div>
                            <div className='md:w-1/2 md:order-2 order-1'>
                                <div className='flex flex-col gap-y-2 py-2'>
                                    <div className='md:w-11/12 flex flex-col gap-y-2'>
                                        <div>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex gap-2 items-center'>
                                                    <img src="https://thegioigames.vn/wp-content/uploads/2023/07/sony-dualsense-edge-wireless-controller-2.jpg" alt="" className='w-10 h-10' />
                                                    <div>LCD Monitor</div>
                                                </div>
                                                <div>$1100</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='flex justify-between py-2 border-b border-black'>
                                                <div>Subtotal:</div>
                                                <div>$1750</div>
                                            </div>
                                            <div className='flex justify-between py-2 border-b border-black'>
                                                <div>Shipping:</div>
                                                <div>Free</div>
                                            </div>
                                            <div className='flex justify-between py-2'>
                                                <div>Total:</div>
                                                <div>$1750</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='flex justify-between items-center'>
                                                <div className='flex gap-2 items-center'>
                                                    <input type="radio" />
                                                    <label htmlFor="">Bank</label>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1200px-Mastercard-logo.svg.png" alt="" className='w-8 h-8' />
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="" className='w-8 h-8' />
                                                </div>
                                            </div>
                                            <div className='flex gap-2'>
                                                <input type="radio" />
                                                <label htmlFor="">Cash on delivery</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex gap-2'>
                                        <input type="text" placeholder='Coupon Code' className='w-3/5 border border-black px-2' />
                                        <button className='bg-red-600 text-white py-2.5 px-8 text-sm rounded w-2/5'>Apply Coupon</button>
                                    </div>
                                </div>
                                <button className='bg-red-600 text-white py-2.5 px-10 text-sm rounded'>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
