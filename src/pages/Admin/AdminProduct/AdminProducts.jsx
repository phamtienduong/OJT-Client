import React, { useEffect, useState } from 'react'
import { Image, Table, Modal, Form, Input, Select, message, Space, Button, Popconfirm, Upload } from 'antd';
import publicAxios from "../../../config/publicAxios";

import { formatCurrency } from "../../../helper/formatMoney";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
import { uploadImage } from "../../../common/upload"
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
const columns = (handleOkeDelete, handleClickEdit) => [
    {
        title: 'STT',
        dataIndex: 'STT',
        key: 'STT',
        render: (_, __, index) => index + 1
    },
    {
        title: 'ID',
        dataIndex: 'product_id',
        key: 'product_id',
    },
    {
        title: 'Image',
        dataIndex: 'default_image',
        key: 'default_image',
        render: (default_image) => <Image src={default_image} width={100} />
    },
    {
        title: 'NameProduct',
        key: 'nameProduct',
        dataIndex: 'product_name',

    },
    {
        title: 'Description',
        key: 'description',
        dataIndex: 'description',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (price) => <>{formatCurrency(+price)} </>
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, product) => (<>
            <Button onClick={() => handleClickEdit(product)}>Edit</Button>


            <Popconfirm className='ml-2'
                title="Delete product"
                description="Are you sure to delete this task?"
                onConfirm={() => handleOkeDelete(product.product_id)}
                onCancel={() => { }}
                okText="Yes"
                cancelText="No"
            >
                <Button danger>Delete</Button>
            </Popconfirm>

        </>)
    },
];
// lấy ra component search
const { Search } = Input;

// khi submit form ko thành công
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

export default function AdminProducts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([])
    const [productUpdate, setProductUpdate] = useState()
    const [categories, setCategories] = useState([]);
    const [fileImage, setFileImage] = useState()
    const [form] = Form.useForm()
    const [flag, setFlag] = useState(true)
    const [search, setSearch] = useState("")
    const [cateChange, setCateChange] = useState("")
    const [images, setImages] = useState(["", "", ""])
    const navigate = useNavigate()


    // const onSearch = (value, _e, info) => console.log(info?.source, value);

    // console.log(productUpdate);
    const handleChangeImages = async (e, index) => {
        const url = await uploadImage(e.target.files[0])

        if (productUpdate?.product_id) {
            console.log("change images", { id: productUpdate.impds[index].id, url });
            await publicAxios.put(`/api/v1/products/update-impds`, { id: productUpdate.impds[index].id, url })
            const newImages = [...images]
            newImages[index] = url
            setImages(newImages)
            return
        }
        console.log("add images");
        const newImages = [...images]
        newImages[index] = url
        setImages(newImages)
    }
    // hien thi modal 
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    // tat modal
    const handleCancel = async () => {
        // xoá các trường đã nhập
        form.resetFields()
        // tắt modal
        setIsModalOpen(false);
        // set lại thông tin cần update
        setProductUpdate()

        setImages(["", "", ""])
        await getAllProduct()
    };
    const getAllProduct = async () => {


        try {
            const token = localStorage.getItem("token") || "";
            const headers = {
                Authorization: `Bearer ${token}`
            };
            // console.log(headers);
            const res = await publicAxios.get("/api/v1/products/get-list", { headers })
            console.log(res.data);
            setProducts(res.data)
        } catch (error) {
            alert("Bạn ko có quyền")
            navigate("/home")
        }

    }
    const getCategories = async () => {
        const result = await publicAxios.get("/api/v1/category/get-list")
        // console.log(result.data);
        setCategories(result.data)
    }
    // console.log(products);
    useEffect(() => {
        getAllProduct();
        getCategories();
    }, [flag]);
    const handleChangeImage = (e) => {
        setFileImage(e.target.files[0])
    }
    const handleChangeCategory = (e) => {

    };
    // console.log(cateChange);
    // hàm thêm hoặc sửa sp
    const onFinish = async (values) => {
        // console.log(values);
        console.log(values);

        // nếu có thông tin về sản phẩm cần sửa thì sẽ sửa
        if (productUpdate) {
            // lưu thông tin product 
            let newProduct
            // nếu cập nhật prodcut mà có ảnh thì
            if (fileImage) {
                // gửi ảnh lên firebase rồi lấy lại link
                const imageRef = ref(storage, `image/${fileImage.name}`)
                await uploadBytes(imageRef, fileImage);
                const url = await getDownloadURL(imageRef);

                // nếu gửi lên thành công
                if (url) {
                    // thêm thông tin để chuyển đi update
                    // lấy thông tin mới và link ảnh mới
                    newProduct = {
                        product_name: values.product_name,
                        price: values.price,
                        description: values.description,
                        category: values.category_id,
                        discount: values.discount,
                        default_image: url,
                    }
                } else {
                    message.error('Upload Image Failed!')
                }
            } else {
                // sửa sản phẩm và không cập nhật ảnh
                // lấy thông tin mới và giữ lại ảnh cũ
                newProduct = {
                    product_name: values.product_name,
                    price: parseInt(values.price),
                    description: values.description,
                    category_id: values.category_id,
                    discount: values.discount,
                    default_image: productUpdate.default_image,
                }
            }
            // gửi dữ liệu lên db
            const result = await publicAxios.patch(`/api/v1/products/update/${productUpdate.product_id}`, newProduct)
            if (result.status == 200) {
                message.success("Sửa thành công")
                form.resetFields() // xoá thông tin nhập nơi form
                setFileImage() // xoá thông tin về ảnh đã chọn
                await getAllProduct() // lấy thông tin sản phẩm để vẽ lại
            } else {
                message.error('Sửa thất bại')
            }

            return
        }

        // đây là khi thêm sản phẩm
        // nếu đã chọn ảnh
        if (fileImage) {
            // đưa ảnh lên firebase rồi lấy link
            const imageRef = ref(storage, `image/${fileImage.name}`)
            await uploadBytes(imageRef, fileImage);
            const url = await getDownloadURL(imageRef);

            if (url) {
                // lấy thông tin mới nhập và link ảnh
                const newProduct = {
                    product_name: values.product_name,
                    price: values.price,
                    description: values.description,
                    category_id: values.category_id,
                    discount: values.discount,
                    default_image: url,
                    images
                }
                // console.log("===>>> :: ", newProduct);
                // gửi thông tin lên db
                const result = await publicAxios.post("/api/v1/products/create", newProduct)
                // console.log(" === >>> :: result :::",result);
                if (result.status == 201) {
                    message.success("Thêm mới thành công")
                    form.resetFields()
                    setFileImage()
                    setImages(["", "", ""])
                    await getAllProduct()
                } else {
                    message.error('Thêm mới thất bại')
                }
            } else {
                message.error('Upload Image Failed!')
            }
        } else {
            message.error("Chọn ảnh")
        }
    };

    // xoá sp
    const handleOkeDelete = async (id) => {
        // console.log(id);
        const result = await publicAxios.delete(`/api/v1/products/delete/${id}`)
        // console.log(result);
        if (result.status == 200) {
            message.success(result.data.message)
            getAllProduct()
        } else {
            message.error(result.data.message)
        }
    }

    // khi click nút edit
    const handleClickEdit = (product) => {
        // let findProd = products.find(item => item.product_id == product.product_id)

        // setCateChange(findProd.category_id.category_name)
        // console.log(categories);
        // Set field values using form.setFieldsValue()
        form.setFieldsValue({
            ...product
        });
        form.setFieldValue("category_id", product.category_id.category_id)
        // Save product update information
        setProductUpdate(product)
        // Open the modal
        setIsModalOpen(true)
        // setImages(product.impds)
    }


    const handleClickSearch = async (value) => {
        // console.log(value);
        const result = await publicAxios.get(`api/v1/products/search?key=${value}`)
        // console.log(result);
        setProducts(result.data)
    }

    // console.log(cateChange);
    return (
        <div>
            {
                isModalOpen && (
                    <Modal maskClosable={false}
                        width={800}
                        title="Info Product"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={<></>}>
                        <Form
                            form={form}
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 20 }}
                            style={{ maxWidth: 800 }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="category"
                                name="category_id"
                                rules={[{ required: true, message: 'Please select a category!' }]}
                            >
                                <Select
                                    defaultValue={productUpdate?.category_id?.category_id || "--Select Category--"}
                                    // value={cateChange}
                                    style={{ width: 220 }}
                                    onChange={handleChangeCategory}
                                    options={categories.map((item) => {
                                        return {
                                            value: item.category_id,
                                            label: item.category_name
                                        }
                                    })}

                                />
                            </Form.Item>
                            <Form.Item
                                label="product_name"
                                name="product_name"
                                rules={[{ required: true, message: 'Please input product name!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="price"
                                name="price"
                                rules={[{ required: true, message: 'Please input product price!' }]}
                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item
                                label="discount"
                                name="discount"
                                rules={[{ required: true, message: 'Please input product discount!' }]}
                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item
                                label="description"
                                name="description"
                                rules={[{ required: true, message: 'Please input product description!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="default_image" name="default_image" htmlFor='file-image'>
                                <Input id='file-image' type='file' style={{ display: "none" }} onChange={handleChangeImage} />
                                <Image src={productUpdate?.product_id ? productUpdate.default_image : fileImage ? URL.createObjectURL(fileImage) : ""} alt='default_image' width={100} />
                            </Form.Item>

                            <div className='flex justify-between mb-4' style={{ padding: "0 100px" }}>
                                <div>
                                    <label htmlFor='images0'
                                        style={{
                                            cursor: 'pointer', border: "1px solid black", padding: "5px 10px",
                                            borderRadius: 4
                                        }}
                                    >Image 1</label>
                                    <input id='images0' type="file" accept='image/*' hidden
                                        onChange={(e) => handleChangeImages(e, 0)}
                                    />
                                    <img width={150} src={images[0] || productUpdate?.impds[0].url} alt='item1' />
                                </div>
                                <div>
                                    <label htmlFor='images1'
                                        style={{
                                            cursor: 'pointer', border: "1px solid black", padding: "5px 10px",
                                            borderRadius: 4
                                        }}
                                    >Image 2</label>
                                    <input id='images1' type="file" accept='image/*' hidden
                                        onChange={(e) => handleChangeImages(e, 1)}
                                    />
                                    <img width={150} src={images[1] || productUpdate?.impds[1].url} alt='item1' />
                                </div>
                                <div>
                                    <label htmlFor='images2'
                                        style={{
                                            cursor: 'pointer', border: "1px solid black", padding: "5px 10px",
                                            borderRadius: 4
                                        }}
                                    >Image 3</label>
                                    <input id='images2' type="file" accept='image/*' hidden
                                        onChange={(e) => handleChangeImages(e, 2)}
                                    />
                                    <img width={150} src={images[2] || productUpdate?.impds[2].url} alt='item1' />
                                </div>
                            </div>
                            <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
                                <Button className='bg-blue-600' type="primary" htmlType="submit">Add</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                )

            }

            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <h4 className=" text-3xl font-bold text-center">Product Management</h4>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                        <div>
                            <Button style={{ minWidth: 100 }} onClick={showModal} >Add</Button>
                        </div>
                        <div>
                            <Space direction="vertical">
                                <Input.Search
                                    placeholder="input search text"
                                    allowClear
                                    size="large"
                                    onSearch={handleClickSearch}
                                />
                            </Space>
                        </div>
                    </div>
                    <Table pagination={{ pageSize: 5 }} dataSource={products} style={{ marginBottom: "20px" }} columns={columns(handleOkeDelete, handleClickEdit)} />
                </div>
            </div>
        </div>
    )
}
