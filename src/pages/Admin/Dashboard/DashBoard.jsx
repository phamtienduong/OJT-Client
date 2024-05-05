import { DollarCircleOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { Space, Statistic, Typography, Card, Result } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import publicAxios from "../../../config/publicAxios";

import { formatCurrency } from '../../../helper/formatMoney';
import { useNavigate } from 'react-router-dom';
import { customNavigate } from '../../../app/hook';

export default function DashBoard() {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([])

    const getInfoDasboard = async () => {
        try {
            const token = localStorage.getItem("token") || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };
            // console.log(headers);
            const res = await publicAxios.get("/api/v1/bill-detail", { headers })
            const ressult = await publicAxios.get("/api/v1/users/list")
            console.log(ressult.data.data);

            setUsers(ressult.data.data)
            setOrders(res.data)
        } catch (error) {
            alert("Bạn ko có quyền")
            customNavigate(navigate, "/home")
        }
    }


    let money = orders.reduce((acc, item) => {
        if (item.status == "accept") {
            acc += item.total_price
        }
        return acc;
    }, 0)
    console.log(money);


    useEffect(() => {
        getInfoDasboard()
    }, [])
    console.log(users);
    console.log(orders);

    return (
        <div>
            <Typography.Title level={4}>DashBoard</Typography.Title>
            <div className='flex justify-around'>
                <Space direction='horizontal'>
                    <div >
                        <DashBoardCard icon={<ShoppingCartOutlined style={{
                            color: "green", backgroundColor: "rgba(0,255,0,0.25)", borderRadius: 20, fontSize: 24,
                            padding: 8
                        }} />} title={"Orders"} value={orders.length} />
                    </div>
                    {/* <div className='ml-[40px]'>
                        <DashBoardCard icon={<ShoppingOutlined style={{
                            color: "blue", backgroundColor: "rgba(0,0,255,0.25)", borderRadius: 20, fontSize: 24,
                            padding: 8
                        }} />} title={"Inventory"} value={12345} />
                    </div> */}
                    <div className='ml-[40px]'>
                        <DashBoardCard icon={<UserOutlined style={{
                            color: "purple", backgroundColor: "rgba(0,255,255,0.25)", borderRadius: 20, fontSize: 24,
                            padding: 8
                        }} />} title={"Customer"} value={users.length} />
                    </div>
                    <div className='ml-[40px]'>
                        <DashBoardCard icon={<DollarCircleOutlined style={{
                            color: "red", backgroundColor: "rgba(255,0,0,0.25)", borderRadius: 20, fontSize: 24,
                            padding: 8
                        }} />} title={"Revenue"} value={formatCurrency(money)} />
                    </div>
                </Space>
            </div>
        </div>
    )
}
function DashBoardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction='horizontal'>
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    )
}
