import React, { useState } from 'react';
import { Modal, Input, Button, message, Upload } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, LoadingOutlined, CameraOutlined } from '@ant-design/icons';
import publicAxios from '../../config/publicAxios';
import { storage } from '../../firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Account = () => {
    // const user = JSON.parse(localStorage.getItem('user_login'));
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user_login')))
    // console.log(user);
    // const [avatar, setAvatar] = useState(user.avatar);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileImage, setFileImage] = useState();
    const [userInfo, setUserInfo] = useState({
        user_name: user?.user_name,
        email: user?.email,
        phone: user?.phone,
        avatar: user?.avatar
    });

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleUpdateUserInfo = async () => {
        try {
            const res = await publicAxios.put(`/api/v1/users/update/${user.user_id}`, userInfo);
            localStorage.setItem("user_login", JSON.stringify(res.data.data.data));
            message.success('Profile updated successfully');
            setUser(res.data.data.data);
            setUserInfo(res.data.data.data);
        } catch (error) {
            console.log(error);
            message.error('Failed to update profile');
        }
        setIsModalOpen(false);
    };

    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    };


    const handleUploadChange = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            // Không cần return ở đây, ta muốn theo dõi tiến trình tải lên.
        }
        const file = info.file.originFileObj; // Lấy file gốc từ sự kiện
        if (file) {
            const storageRef = ref(storage, `avatars/${user.user_id}/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Đăng ký sự kiện để theo dõi quá trình tải lên
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // console.log('Upload is ' + progress + '% done');
                    // switch (snapshot.state) {
                    //     case 'paused': // or handle as you need
                    //         // console.log('Upload is paused');
                    //         break;
                    //     case 'running': // or handle as you need
                    //         // console.log('Upload is running');
                    //         break;
                    //     default:
                    //         break;
                    // }
                },
                (error) => {
                    // Handle lỗi ở đây
                    // console.error(error);
                    message.error('Upload failed. Please try again.');
                    setLoading(false);
                },
                () => {
                    // Thành công: Lấy URL và cập nhật lại trạng thái cho người dùng
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // console.log('File available at', downloadURL);
                        // setAvatar(downloadURL);
                 
                        setLoading(false);
                        setUserInfo({ ...userInfo, avatar: downloadURL });
                        // message.success('Avatar uploaded successfully!');
                    });
                }
            );
        } else {
            // Handle khi không có file trong sự kiện info, hoặc hiển thị thông báo thích hợp
            message.error('No file found for upload.');
            setLoading(false);
        }
    };

    const modalFooter = [
        <Button key="back" onClick={handleCancel}>
            Cancel
        </Button>,
        <Button key='submit' type="primary" onClick={handleUpdateUserInfo}>
            Save Changes
        </Button>,
    ];

    return (
        <div className="container mx-auto my-8 p-8 bg-white rounded-xl shadow-2xl">
            <div className="grid md:grid-cols-3 gap-10">
                <div className="flex flex-col items-center justify-center col-span-1 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-xl text-white py-10">
                    {loading ? <LoadingOutlined className="mb-3 text-6xl" /> : (
                        <img src={userInfo?.avatar || "your-default-avatar-url"} alt="Avatar" className="mb-4 w-32 h-32 rounded-full border-4 border-white" />
                    )}
                    <h2 className="text-2xl font-semibold">{userInfo.user_name}</h2>
                    <p className="opacity-90">{userInfo.email}</p>
                    <Button icon={<EditOutlined />} className="mt-4" type="primary" ghost onClick={showModal}>
                        Edit Profile
                    </Button>
                </div>
                <div className="col-span-2 py-10">
                    <h1 className="text-3xl font-semibold mb-6">My Profile</h1>
                    <p className="mb-10">Manage your personal information for account security.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input addonBefore="Email" name="email" value={userInfo.email} onChange={handleInput} />
                        <Input addonBefore="Phone" name="phone" value={userInfo.phone} onChange={handleInput} />
                    </div>
                </div>
            </div>
            <Modal
                title="Update Personal Information"
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={modalFooter}
                className="rounded-xl"
            >
                <Input onChange={handleInput} name='user_name' className="mb-4" prefix={<EditOutlined />} placeholder="User Name" value={userInfo.user_name} />
                <Input onChange={handleInput} name='email' className="mb-4" prefix={<MailOutlined />} placeholder="Email" value={userInfo.email} />
                <Input onChange={handleInput} name='phone' className="mb-4" prefix={<PhoneOutlined />} placeholder="Phone" value={userInfo.phone} />
                <div className="mb-4">
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}
                        className="avatar-uploader"
                    >
                        {loading ? <LoadingOutlined /> : <CameraOutlined />}
                        <div style={{ marginTop: 8 }}>Change Avatar</div>

                    </Upload>
                </div>
            </Modal>
        </div>
    );
};

export default Account;
