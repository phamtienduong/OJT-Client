import React, { useEffect, useState } from "react";
import { TERipple } from "tw-elements-react";
import image from "../../Images/111.png";
import { useNavigate } from "react-router-dom";
import publicAxios from "../../config/publicAxios";
import { notification } from "antd";
import { registerApi } from "../../apis/auth/auth";
import { RouterLink } from "../../Components/custom/RouterLink";
import { customNavigate } from "../../app/hook";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    errName: "",
    errEmail: "",
    errPhone: "",
    errPass: "",
    errConfirm: "",
  });

  const validateInput = () => {
    const regexName = /^.{6,}$/;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const regexPhone = /^(0|\+84)\d{9,10}$/;
    const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    let isValid = true;
    const errors = {};

    if (!regexName.test(formData.user_name.trim())) {
      errors.errName = "Tên phải có ít nhất 6 ký tự";
      isValid = false;
    }

    if (!regexEmail.test(formData.email)) {
      errors.errEmail = "Email không đúng định dạng";
      isValid = false;
    }

    if (!regexPhone.test(formData.phone)) {
      errors.errPhone = "Số điện thoại không đúng định dạng";
      isValid = false;
    }

    if (!regexPass.test(formData.password)) {
      errors.errPass = "Mật khẩu phải có ít nhất 6 ký tự và chứa cả chữ cái và số";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.errConfirm = "Mật khẩu không khớp";
      isValid = false;
    }

    setErrorMessages(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      notification.error({
        message: "Vui lòng nhập đủ thông tin!",
      });
      return;
    }

    const isValid = validateInput();
    if (isValid) {
      try {
        const res = await registerApi(formData);
        console.log(res);
        notification.success({
          message: res.message,
        });
        customNavigate(navigate, "/login");
      } catch (error) {
        notification.error({ message: "Đã xảy ra lỗi!" });
      }
    }
  };

  useEffect(() => {
    handleRegister()
    // Không cần gọi handleRegister ngay khi component mount
  }, []);

  return (
    <section className="h-screen">
      <div>
        <div className="g-6 flex h-full flex-wrap items-center justify-center ">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src={image}
              className="w-6/13 h-1/3"
              alt="Sample image"
            />
          </div>

          <div className="mt-6 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 z-99">
            <h1 className="mb-3 text-4xl font-bold text-center">
              Create an Account
            </h1>
            <form onSubmit={handleRegister}>
              <div className="mb-6">
                <label htmlFor="user_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  User Name
                </label>
                <input
                  onChange={handleInputChange}
                  value={formData.user_name}
                  type="text"
                  name="user_name"
                  id="user_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your user name"
                  required=""
                />
                <p id="usename-error" style={{ paddingLeft: 10, color: 'red' }}>{errorMessages.errName}</p>
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  onChange={handleInputChange}
                  value={formData.email}
                  type="email"
                  name="email"
                  id="email"
                  style={{ backgroundColor: "#E8F0FE" }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your email"
                  required=""
                />
                {/* <p id="email-error" style={{ paddingLeft: 10, color: 'red' }}>{errorMessages.errEmail}</p> */}
                <p id="email-error" style={{ paddingLeft: 10, color: 'red' }}>{errorMessages.errEmail}</p>

              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your phone
                </label>
                <input
                  onChange={handleInputChange}
                  value={formData.phone}
                  type="phone"
                  name="phone"
                  id="phone"
                  style={{ backgroundColor: "#E8F0FE" }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter your phone"
                  required=""
                />
                <p id="phone-error" style={{ paddingLeft: 10, color: 'red' }}>{errorMessages.errPhone}</p>
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
                <p id="password-error" style={{ paddingLeft: 10, color: 'red' }}>{errorMessages.errPass}</p>
              </div>

              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Confirm your password
                </label>
                <input
                  type="password"
                  onChange={handleInputChange}
                  value={formData.confirmPassword}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  style={{ backgroundColor: "#E8F0FE" }}
                />
                <p id="confirm-error" style={{ paddingLeft: 10, color: 'red' }}>{errorMessages.errConfirm}</p>
              </div>

              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Register
                  </button>
                </TERipple>

                <p className="mb-0 mt-4 pt-1 text-sm font-semibold">
                  Have an account?{" "}
                  <RouterLink
                    to="/login"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Login
                  </RouterLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
