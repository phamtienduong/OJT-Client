import React, { useState, Fragment } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FolderAddOutlined,
  CloudUploadOutlined

} from '@ant-design/icons';
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";

import { Layout, Menu, Button, theme, Image, Dropdown, Space, Avatar } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
// import App from '../../App';
import AppRouters from '../AppRouter/AppRouters';
// import "./LayoutAdmin.scss"
import {
    ArrowLeftOnRectangleIcon,
    PhoneIcon,
    PlayCircleIcon,
    PhotoIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
const { Header, Sider, Content } = Layout;
export default function LayoutAdmin() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate()
  const user_login = JSON.parse(localStorage.getItem("user_login"))
 
  // Change avt or log out

 
   const handleLogOut = () => {
       let confirm1 = confirm("Quản lý có muốn đăng xuất ko?")
       if(confirm1){
        localStorage.removeItem("user_login");
        localStorage.removeItem("admin_token");
        navigate("/auth/admin");
       }
   };
   const handleAvatar = () => {
     console.log("haha")
   }
    const callsToAction = [
        { name: "Change Avatar", onClick: handleAvatar , icon: PhotoIcon },
        {
            name: "Log out",
            onClick:  handleLogOut ,
            icon: ArrowLeftOnRectangleIcon,
        },
    ];
  //
  // console.log(user_login.user_name)
  // const addTest = ()=>{
  //   const user_login = {
  //     user_name:"Thiên Lang"
  //   }
  //   localStorage.setItem("user_login", JSON.stringify(user_login))
  // }
  // addTest()
  return (
      <Layout style={{ minHeight: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
              <div className="demo-logo-vertical" />
              <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  onClick={(item) => {
                      navigate(item.key);
                  }}
                  items={[
                      {
                          key: "/dashboard",
                          icon: <AppstoreOutlined />,
                          label: "Dashboard",
                      },
                      {
                          key: "/ad_users",
                          icon: <UserOutlined />,
                          label: "Customers",
                      },
                      {
                          key: "/ad_products",
                          icon: <FolderAddOutlined />,
                          label: "Products",
                      },
                      {
                          key: "/ad_bill",
                          icon: <ShoppingCartOutlined />,
                          label: "Orders",
                      },
                      {
                          key: "/ad_category",
                          icon: <CloudUploadOutlined />,
                          label: "Categorys",
                      },
                      {
                          key: "/ad_review",
                          icon: <CloudUploadOutlined />,
                          label: "Reviews",
                      },
                  ]}
              />
          </Sider>
          <Layout>
              <Header
                  style={{
                      padding: 0,
                      background: colorBgContainer,
                      height: 90,
                  }}
              >
                  <div className="flex justify-between mr-8">
                      <div>
                          <Button
                              type="text"
                              icon={
                                  collapsed ? (
                                      <MenuUnfoldOutlined />
                                  ) : (
                                      <MenuFoldOutlined />
                                  )
                              }
                              onClick={() => setCollapsed(!collapsed)}
                              style={{
                                  fontSize: "16px",
                                  width: 64,
                                  height: 64,
                              }}
                          />
                      </div>
                      <div className="mt-2">
                          <Image
                              width={200}
                              height={75}
                              preview={false}
                              src="https://cdn.cookielaw.org/logos/43e4447f-bb50-4761-be9f-59f99ad594aa/018e6750-2208-703d-8b42-b7d949413fa0/8b63062d-7457-4af4-8b39-40b6f77d482b/CORSAIRLogo2020_horiz_K.png"
                          />
                      </div>
                      <div>
                          <Space className="flex items-center h-3/4">
                              <Popover.Group className="hidden lg:flex lg:gap-x-12  items-center">
                                  <Popover className="relative">
                                      <Popover.Button className="flex items-center gap-x-1 text-m font-bold leading-6 text-black-800 mb-1">
                                          <div style={{ cursor: "pointer" }}>
                                              <Avatar size={40}>
                                                  {user_login?.user_name
                                                      ?.charAt(0)
                                                      .toUpperCase()}
                                              </Avatar>
                                          </div>
                                      </Popover.Button>

                                      <Transition
                                          as={Fragment}
                                          enter="transition ease-out duration-200"
                                          enterFrom="opacity-0 translate-y-1"
                                          enterTo="opacity-100 translate-y-0"
                                          leave="transition ease-in duration-150"
                                          leaveFrom="opacity-100 translate-y-0"
                                          leaveTo="opacity-0 translate-y-1"
                                      >
                                          <Popover.Panel className="absolute -left-10 top-full z-10 mt-3  overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                                              <div className="p-0">
                                                  {callsToAction.map((item) => (
                                                      <div
                                                          key={item.name}
                                                          className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-1 hover:bg-gray-50"
                                                      >
                                                          <div className="flex h-1 w-6 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                              <item.icon
                                                                  className="h-6 w-6 text-gray-600 group-hover:text-indigo-600 "
                                                                  aria-hidden="true"
                                                              />
                                                          </div>
                                                          <div className="flex-auto">
                                                              <button
                                                                  onClick={
                                                                      item.onClick
                                                                  }
                                                                  className="block font-semibold text-gray-900"
                                                              >
                                                                  {item.name}
                                                                  <span className="absolute inset-0" />
                                                              </button>
                                                          </div>
                                                      </div>
                                                  ))}
                                              </div>
                                          </Popover.Panel>
                                      </Transition>
                                  </Popover>
                              </Popover.Group>

                              <button
                                  className="text-lg"
                              >
                                  <div>{user_login?.user_name}</div>
                              </button>
                          </Space>
                      </div>
                  </div>
              </Header>
              <Content
                  style={{
                      margin: "24px 16px",
                      padding: 24,
                      minHeight: 280,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                  }}
              >
                  <div>
                      <Outlet />
                  </div>
              </Content>
          </Layout>
      </Layout>
  );
}
