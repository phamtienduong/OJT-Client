import React, { useState } from 'react';
import { Modal, Input, Button, message, Upload } from 'antd';
import { EditOutlined, MailOutlined, PhoneOutlined, IdcardOutlined, HomeOutlined, LoadingOutlined, CameraOutlined } from '@ant-design/icons';
// import { storage } from '../firebase'; // Import Firebase storage instance

const Account = () => {
    const user = JSON.parse(localStorage.getItem('user_login'));
    const [avatar, setAvatar] = useState(user.avatar);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const handleUpdateUserInfo = async () => {
        // Here you would handle the submission of updated user info and avatar
        setIsModalOpen(false);
        // Implement the save logic (API PUT/POST request)
        message.success('Profile updated successfully');
    };
    
    const beforeUpload = file => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        return isJpgOrPng;
    };

    const handleUploadChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Upload image to Firebase Storage
            const storageRef = storage.ref();
            const uploadTask = storageRef.child(`avatars/${user.user_id}`).put(info.file.originFileObj);

            uploadTask.on('state_changed', 
                snapshot => {
                    // Handle progress
                },
                error => {
                    // Handle error
                    console.error(error);
                    message.error('Failed to upload image');
                    setLoading(false);
                },
                () => {
                    // Handle successful upload
                    uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                        // Update avatar URL in state and stop loading
                        setAvatar(downloadURL);
                        setLoading(false);
                    });
                }
            );
        }
    };

    // Enhanced modal footer actions
    const modalFooter = [
        <Button key="back" onClick={handleCancel}>
            Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleUpdateUserInfo}>
            Save Changes
        </Button>,
    ];

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <CameraOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div className="container mx-auto my-8 p-8 bg-white rounded-xl shadow-2xl">
            <div className="md:flex gap-10">
                {/* Avatar and Edit Profile Button */}
                <div className="flex flex-col items-center md:w-1/3 p-4 text-center bg-gradient-to-tr from-blue-400 to-purple-500 rounded-xl text-white">
                    {
                        loading ? <LoadingOutlined className="mb-4 w-32 h-32 text-6xl" /> : (
                            <img src={avatar} alt="Avatar" className="mb-4 w-32 h-32 rounded-full border-4 border-white transition transform hover:scale-105" />
                        )
                    }
                    <h2 className="text-2xl font-semibold">{user.user_name}</h2>
                    <p className="opacity-90">{user.email}</p>
                    <Upload
                        name="avatar"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        onChange={handleUploadChange}
                        style={{ width: '100%' }}
                    >
                        <Button icon={<CameraOutlined />} className="mt-4">Change Avatar</Button>
                    </Upload>
                    <Button icon={<EditOutlined />} className="mt-4" type="ghost" onClick={showModal}>
                        Edit Profile
                    </Button>
                </div>
                
                {/* User Details */}
                <div className="flex-grow md:w-2/3 p-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-semibold mb-2">My Profile</h1>
                        <p>Manage your personal information for account security.</p>
                    </div>
                    {/* User Details */}
                    <div className="space-y-2">
                        <p><MailOutlined className="mr-2" />{user.email}</p>
                        <p><PhoneOutlined className="mr-2" />{user.phone}</p>
                        <p><IdcardOutlined className="mr-2" />{user.gender}</p>
                        <p><HomeOutlined className="mr-2" />{user.address}</p>
                    </div>
                </div>
            </div>

            {/* Modal for Updating Information */}
            <Modal
                title="Update Personal Information"
                visible={isModalOpen}
                onCancel={handleCancel}
                footer={modalFooter}
                className="rounded-xl"
            >
                <Input className="mb-4" addonBefore="User Name" defaultValue={user.user_name} />
                <Input className="mb-4" addonBefore="Email" defaultValue={user.email} />
                <Input className="mb-4" addonBefore="Phone" defaultValue={user.phone} />
                <Input className="mb-4" addonBefore="Gender" defaultValue={user.gender} />
                <Input addonBefore="Address" defaultValue={user.address} />
            </Modal>
        </div>
    );
};

export default Account;
