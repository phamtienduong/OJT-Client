import { Button, Form, Input, Modal, Popconfirm, Table, message } from 'antd'

import { useEffect, useState } from 'react';
import publicAxios from "../../../config/publicAxios";

const columns = (handleOkeDelete, handleClickEdit) => [
    {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        render: (_, record, index) => index + 1


    },
    {
        title: 'NameCategory',
        dataIndex: 'category_name',
        key: 'category_name',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, category) => (<>
            <Button onClick={() => handleClickEdit(category)}>Edit</Button>
            <Popconfirm
                title="Delete category"
                description="Are you sure to delete this task?"
                onConfirm={() => handleOkeDelete(category.category_id)}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
            >
                <Button style={{ marginLeft: 10 }} danger>Delete</Button>
            </Popconfirm>
        </>)
    },
];
export default function AdminReview() {
     const [listUser, setList] = useState([])
    const getAllUser = async () => {
        const res = await publicAxios.get("/api/v1/users/list")
        console.log(res.data.data);
        setList(res.data.data)
    }
    const handleChangeActive = async (user) => {
        await publicAxios.patch(`/api/v1/users/active/${user.user_id}`, { active: !parseInt(user.active) })
        getAllUser();
    };
    useEffect(() => {
        getAllUser()
    }, [])
    return (
       
    
        <div>
            <div>
                <h1 className='text-3xl font-bold text-center mb-6'>User Management</h1>
            </div>
            <div>
                <Table dataSource={listUser} columns={columns(handleChangeActive)} />
            </div>
        </div>
    )
    
}
