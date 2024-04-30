import React, { useState, useEffect } from 'react';
import { TEInput } from "tw-elements-react";
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
        if (password != cfPassword) {
            return notification.error({
                message: "Mật khẩu không trùng khớp"
            })
        }
        try {
            let res = await resetPassword({ id, password })
            notification.success({
                message: res.message + ". Go back to login"
            })
            setCfPassword("")
            setPassword("")
            localStorage.removeItem("reset_id")
            setId(JSON.parse(localStorage.getItem("reset_id")));
            setFlag(!flag);
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="md:p-20 flex flex-col md:gap-y-4 gap-y-2">
                <div className="text-xl">Reset your password</div>
                <TEInput label="New Password" type="password" onChange={(e) => setPassword(e.target.value)} value={password}></TEInput>
                <TEInput label="Confirm New Password" type="password" onChange={(e) => setCfPassword(e.target.value)} value={cfPassword}></TEInput>
                <button className='bg-green-400 w-max px-4 py-2 rounded-md' onClick={handleClick}>Xác nhận</button>
            </div>
        </>
    )
}
