import { Button, Form, Input, Modal, Popconfirm, Table, message } from 'antd'

import { useEffect, useState } from 'react';
import publicAxios from "../../../config/publicAxios";
import { useNavigate } from 'react-router-dom';

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
export default function AdminCategory() {
    const [category, setCategory] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState()
    const [form] = Form.useForm()
    const showModal = () => {
        setIsModalOpen(true);
    };
    const navigate = useNavigate()
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
        setCategoryUpdate()
    };
    const onFinish = async (values) => {

        const check = category.find(item => item.category_name === values.category_name)
        if (check) {
            message.error('Product name already exists!')
        } else {
            if (categoryUpdate) {
                const result = await publicAxios.patch(`/api/v1/category/update/${categoryUpdate.category_id}`, values)
                if (result.status == 200) {
                    message.success(result.data.message)
                }
            } else {
                const result = await publicAxios.post("/api/v1/category/create", values)
                // console.log(result.data);
                if (result.status == 201) {
                    message.success(result.data.message)
                }
            }
            handleCancel()
            await getCategories()
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const getCategories = async () => {
        try {
            const token = localStorage.getItem("token") || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };
            console.log(headers);
            // console.log(headers);
            const res = await publicAxios.get("/api/v1/category/get-list", { headers });
            // console.log(res.data);
            setCategory(res.data);
        } catch (error) {
            alert("Bạn ko có quyền")
            navigate("/home")
        }

    }

    useEffect(() => {
        getCategories();
    }, [])
    const handleOkeDelete = async (id) => {
        const result = await publicAxios.delete(`/api/v1/category/delete/${id}`)
        // console.log(result);
        if (result.status == 200) {
            message.success(result.data.message)
            getCategories()
        } else {
            message.error("Delete failed")
        }
    }
    const handleClickEdit = (category) => {
        // console.log(category);
        form.setFieldsValue({
            ...category
        })
        setCategoryUpdate(category)
        setIsModalOpen(true)
    }
    return (
        <div>
            <Modal
                maskClosable={false}
                width={800}
                title="Info Category"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="basic"
                    form={form}
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 21 }}
                    style={{ maxWidth: 800 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Add category"
                        name="category_name"
                        rules={[{ required: true, message: 'Please input your category!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
                        <Button className='bg-blue-700' type="primary" htmlType="onclick">{categoryUpdate ? "Edit" : "Add"}</Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div>
                <div>
                    <h1 className='text-3xl font-bold text-center mb-6'>Category Management</h1>
                </div>
                <div className='mb-4'>
                    <Button style={{ minWidth: 100 }} onClick={showModal}>Add</Button>
                </div>
                <div>
                    <Table dataSource={category} columns={columns(handleOkeDelete, handleClickEdit)} />
                </div>
            </div>
        </div>
    )
}
