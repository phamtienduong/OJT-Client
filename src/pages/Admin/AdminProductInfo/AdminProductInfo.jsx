import React, { useEffect, useState } from "react";
import {
    Image,
    Table,
    Modal,
    Form,
    Input,
    Select,
    message,
    Space,
    Button,
    Popconfirm,
} from "antd";
import publicAxios from "../../../config/publicAxios";
import { uploadImage } from "../../../common/upload/index";
import { formatCurrency } from "../../../helper/formatMoney";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../firebase/firebase";
const columns = (handleOkeDelete, handleClickEdit) => [
    {
        title: "STT",
        dataIndex: "STT",
        key: "STT",
        render: (_, __, index) => index + 1,
    },
    {
        title: "ID",
        dataIndex: "product_info_id",
        key: "product_id",
    },
    {
        title: "Image",
        dataIndex: "images",
        key: "default_image",
        render: (default_image) => <Image src={default_image} width={100} />,
    },
    {
        title: "NameProduct",
        key: "product_name",
        render: (_, record) => record.product_id.product_name,
    },
    {
        title: "Color",
        key: "color",
        dataIndex: "color",
    },
    {
        title: "Ram",
        dataIndex: "ram",
        key: "ram",
        // render: (price) => <>{formatCurrency(+price)} </>
    },
    {
        title: "Stock",
        dataIndex: "stock",
        key: "stock",
    },
    {
        title: "Action",
        key: "action",
        render: (_, product) => (
            <>
                <Button onClick={() => handleClickEdit(product)}>Edit</Button>

                <Popconfirm
                    className="ml-2"
                    title="Delete product"
                    description="Are you sure to delete this task?"
                    onConfirm={() => handleOkeDelete(product.product_id)}
                    onCancel={() => {}}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            </>
        ),
    },
];
// lấy ra component search
const { Search } = Input;

// khi submit form ko thành công
const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

export default function AdminProductInfo() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productUpdate, setProductUpdate] = useState();
    const [categories, setCategories] = useState([]);
    const [fileImage, setFileImage] = useState();
    const [form] = Form.useForm();
    const [flag, setFlag] = useState(true);
    const [search, setSearch] = useState("");
    const [cateChange, setCateChange] = useState("");

    const onSearch = (value, _e, info) => console.log(info?.source, value);
    const [product_info_id, setProduct_info_id] = useState();
    const [product_id, setProduct_id] = useState();
    // hien thi modal
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    // tat modal
    const handleCancel = () => {
        // xoá các trường đã nhập
        form.resetFields();
        // tắt modal
        setIsModalOpen(false);
        // set lại thông tin cần update
        setProductUpdate();
    };
    const getAllProduct = async () => {
        const res = await publicAxios.get(
            "api/v1/product-info/product-info-list"
        );
        console.log(res.data);
        setProducts(res.data);
    };
    const getCategories = async () => {
        const result = await publicAxios.get("/api/v1/category/get-list");
        console.log(result.data);
        setCategories(result.data);
    };
    // console.log(products);
    useEffect(() => {
        getAllProduct();
        getCategories();
    }, [flag]);
    const [fileImages, setFileImages] = useState({});

    const handleChangeImage = async (e, index) => {
        // console.log(index)
        const file = e.target.files[0];
        if (file) {
            const url = await uploadImage(file);
            console.log(url);
            // Cập nhật trạng thái với URL mới bằng cách thêm vào đối tượng fileImages
            setFileImages((prevImages) => ({
                ...prevImages,
                [index]: url, // Sử dụng index làm key
            }));
            // setFileImages(Object.values(fileImages));
        }
    };
    // console.log(fileImages)
    // hàm thêm hoặc sửa sp
    const onFinish = async (values) => {
        // console.log(values);
        console.log(values);

        // nếu có thông tin về sản phẩm cần sửa thì sẽ sửa
        if (productUpdate) {
            // lưu thông tin product
            let newProduct;
            // nếu cập nhật prodcut mà có ảnh thì
            if (fileImages) {
                // thêm thông tin để chuyển đi update
                // lấy thông tin mới và link ảnh mới
                newProduct = {
                    color: values.color,
                    ram: values.ram,
                    stock: values.stock,
                    category: values.category_id,
                    discount: values.discount,
                    image_path: fileImages,
                };
            } else {
                // sửa sản phẩm và không cập nhật ảnh
                // lấy thông tin mới và giữ lại ảnh cũ
                newProduct = {
                    color: values.color,
                    ram: values.ram,
                    stock: values.stock,
                    category: values.category_id,
                    discount: values.discount,
                    // image_path: productUpdate.default_image,
                };
            }
            // gửi dữ liệu lên db
            const result = await publicAxios.patch(
                `/api/v1/product-info/update/${product_id}/${product_info_id}`,
                newProduct
            );
            if (result.status == 200) {
                message.success("Sửa thành công");
                setFileImages("");

                form.resetFields(); // xoá thông tin nhập nơi form
                setFileImage(); // xoá thông tin về ảnh đã chọn
                await getAllProduct(); // lấy thông tin sản phẩm để vẽ lại
            } else {
                message.error("Sửa thất bại");
            }

            return;
        }

        // đây là khi thêm sản phẩm
        // nếu đã chọn ảnh
        if (fileImage) {
            // đưa ảnh lên firebase rồi lấy link
            const imageRef = ref(storage, `image/${fileImage.name}`);
            await uploadBytes(imageRef, fileImage);
            const url = await getDownloadURL(imageRef);

            if (url) {
                // lấy thông tin mới nhập và link ảnh
                const newProduct = {
                    product_name: values.product_name,
                    price: values.price,
                    description: values.description,
                    category: values.category_id,
                    discount: values.discount,
                    default_image: url,
                };
                // gửi thông tin lên db
                const result = await publicAxios.post(
                    "/api/v1/products/create",
                    newProduct
                );
                console.log(result);
                if (result.status == 201) {
                    message.success("Thêm mới thành công");
                    form.resetFields();
                    setFileImage();
                    await getAllProduct();
                } else {
                    message.error("Thêm mới thất bại");
                }
            } else {
                message.error("Upload Image Failed!");
            }
        } else {
            message.error("Chọn ảnh");
        }
    };

    // xoá sp
    const handleOkeDelete = async (id) => {
        console.log(id);
        const result = await publicAxios.delete(
            `/api/v1/products/delete/${id}`
        );
        console.log(result);
        if (result.status == 200) {
            message.success(result.data.message);
            getAllProduct();
        } else {
            message.error(result.data.message);
        }
    };

    // khi click nút edit
    const handleClickEdit = (product) => {
        console.log(product);
        form.setFieldsValue({
            ...product,
        });
        console.log(product.product_id);
        // Save product update information
        setProduct_info_id(product.product_info_id);
        setProduct_id(product.product_id.product_id);
        setProductUpdate(product);
        // Open the modal
        setIsModalOpen(true);
    };

    const handleClickSearch = async (value) => {
        console.log(value);
        const result = await publicAxios.get(
            `api/v1/products/search?key=${value}`
        );
        console.log(result);
        setProducts(result.data);
    };

    console.log(cateChange);
    return (
        <div>
            {isModalOpen && (
                <Modal
                    maskClosable={false}
                    width={800}
                    title="Info Product"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={<></>}
                >
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
                            label="color"
                            name="color"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input color!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="ram"
                            name="ram"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input product ram!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="stock"
                            name="stock"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input product stock!",
                                },
                            ]}
                        >
                            <Input type="number" />
                        </Form.Item>

                        <div
                            className="flex
                           justify-end
                           items-center
                           gap-4
                           "
                        >
                            <Form.Item
                                label="default_image"
                                name="default_image"
                                htmlFor="file-image-1"
                            >
                                <Input
                                    id="file-image-1"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleChangeImage(e, 0)}
                                />
                                <Image
                                    src={
                                        productUpdate?.product_id
                                            ? productUpdate.default_image
                                            : fileImages[i] // Sử dụng index i để truy xuất URL tương ứng từ đối tượng fileImages
                                            ? URL.createObjectURL(fileImages[i])
                                            : ""
                                    }
                                    alt="default_image"
                                    width={100}
                                />
                            </Form.Item>

                            <Form.Item
                                label="default_image"
                                name="default_image"
                                htmlFor="file-image-2"
                            >
                                <Input
                                    id="file-image-2"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleChangeImage(e, 1)}
                                />
                                <Image
                                    src={
                                        productUpdate?.product_id
                                            ? productUpdate.default_image
                                            : fileImages[i] // Sử dụng index i để truy xuất URL tương ứng từ đối tượng fileImages
                                            ? URL.createObjectURL(fileImages[i])
                                            : ""
                                    }
                                    alt="default_image"
                                    width={100}
                                />
                            </Form.Item>

                            <Form.Item
                                label="default_image"
                                name="default_image"
                                htmlFor="file-image-3"
                            >
                                <Input
                                    id="file-image-3"
                                    type="file"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleChangeImage(e, 2)}
                                />
                                <Image
                                    src={
                                        productUpdate?.product_id
                                            ? productUpdate.default_image
                                            : fileImages[i] // Sử dụng index i để truy xuất URL tương ứng từ đối tượng fileImages
                                            ? URL.createObjectURL(fileImages[i])
                                            : ""
                                    }
                                    alt="default_image"
                                    width={100}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
                            <Button
                                className="bg-blue-600"
                                type="primary"
                                htmlType="submit"
                            >
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            )}

            <div className="row">
                <div className="col-12">
                    <div className="page-title-box">
                        <h4 className=" text-3xl font-bold text-center">
                            Product Management
                        </h4>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "20px",
                        }}
                    >
                        <div>
                            <Button
                                style={{ minWidth: 100 }}
                                onClick={showModal}
                            >
                                Add
                            </Button>
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
                    <Table
                        pagination={{ pageSize: 5 }}
                        dataSource={products}
                        style={{ marginBottom: "20px" }}
                        columns={columns(handleOkeDelete, handleClickEdit)}
                    />
                </div>
            </div>
        </div>
    );
}