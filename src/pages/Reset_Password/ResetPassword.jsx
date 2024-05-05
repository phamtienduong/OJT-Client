import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../apis/auth/auth';
import { customNavigate } from '../../app/hook';

export default function ResetPassword() {
    const [id, setId] = useState(JSON.parse(localStorage.getItem("reset_id")));
    const [password, setPassword] = useState("");
    const [cfPassword, setCfPassword] = useState("");
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!id) {
            customNavigate(navigate, "/login")
        }
    }, [flag])
    const handleClick = async () => {
        if (password == "" || cfPassword == "") {
            return notification.error({
                message: "Chưa nhập đủ thông tin"
            }) 
        }
        if (password !== cfPassword) {
            return notification.error({
                message: "Passwords do not match.",
            });
        }
        try {
            let res = await resetPassword({ id, password });
            notification.success({
                message: res.message + ". Go back to login"
            })
            setCfPassword("")
            setPassword("")
            localStorage.removeItem("reset_id")
            setId(JSON.parse(localStorage.getItem("reset_id")));
            setFlag(!flag);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center space-x-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-14 w-14 rounded-full flex items-center justify-center bg-blue-100 text-blue-500"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 2a3 3 0 013 3v3a3 3 0 01-6 0V5a3 3 0 013-3zM8 8v2a1 1 0 102 0V5a1 1 0 10-2 0v3z"
                                    clipRule="evenodd"
                                />
                                <path
                                    fillRule="evenodd"
                                    d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-12a8 8 0 100 16 8 8 0 000-16z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">Reset Password</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                                    Enter your new password below.
                                </p>
                            </div>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form
                                onSubmit={handleClick}
                                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
                            >
                                <div className="flex flex-col">
                                    <label className="leading-loose">New Password</label>
                                    <input
                                        type="password"
                                        className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="New Password"
                                        onChange={(e) => setPassword(e.target.value)} value={password}
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="leading-loose">Confirm New Password</label>
                                    <input
                                        type="password"
                                        className="px-4 py-2 border focus:ring-blue-500 focus:border-blue-500 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                                        placeholder="Confirm New Password"
                                        onChange={(e) => setCfPassword(e.target.value)} value={cfPassword}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 mt-4 text-lg font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700"
                                >
                                    Reset
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
