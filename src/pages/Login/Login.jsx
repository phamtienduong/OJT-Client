import React, { useEffect, useState } from "react";
import { TEInput, TERipple, TEModal, TEModalDialog, TEModalContent, TEModalHeader, TEModalBody, TEModalFooter } from "tw-elements-react";
import "./Login.scss";
import image from "../../Images/111.png";
import { Link, useNavigate } from "react-router-dom";
import publicAxios from "../../config/publicAxios";
import { message, notification } from "antd";
import { FacebookAuth, GoogleAuth } from "../../firebase/firebase";
import { RouterLink } from "../../Components/custom/RouterLink";
import { loginApi, loginFacebook, loginGoogle, mailerApi } from "../../apis/auth/auth";

export default function Login({ setIsLogin }) {
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const [emailForget, setEmailForget] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const handleLogin = async (e) => {
        e.preventDefault()
        const res = await loginApi(user)
        console.log(res.data);
        if (!user.email || !user.password) {
            notification.error({
                message: "Please enter complete information",
            })
            return;
        }

        if (res.data.user.role == "admin") {
            // console.log("11111");
            localStorage.setItem("token", res.data.token)
            localStorage.setItem('user_login', JSON.stringify(res.data.user));
            notification.success({
                message: "Hello Admin",
            })
            setIsLogin(true)
            navigate("/dashboard")
        }
        else if (res.data.user.role == "user") {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem('user_login', JSON.stringify(res.data.user));
            notification.success({
                message: res.message
            })
            setIsLogin(true)
            navigate("/home")
        }
    }
    const OnButtonClick = async () => {
        const auth = await GoogleAuth()
        const user = auth.user
        let data = {
            user_name: user.displayName,
            email: user.email,
            password: user.uid,
            avatar: user.photoURL,
            role: "user",
            status: 0,
            phone: "0962989858"
        }

        try {
            const res = await loginGoogle(data)
            notification.success({
                message: res.message,
            });
            localStorage.setItem("token", res.data.token)
            localStorage.setItem('user_login', JSON.stringify(res.data.user));
            setIsLogin(true)
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }
    const FacebookAuthButtonClicked = async () => {
        const authFb = await FacebookAuth();
        const user = authFb.user
        let data = {
            user_name: user.displayName,
            email: user.email,
            password: user.uid,
            avatar: user.photoURL,
            role: "user",
            status: 0,
            phone: "0962989858"
        }
        try {
            const res = await loginFacebook(data)
            notification.success({
                message: res.message,
            });
            localStorage.setItem("token", res.data.token)
            localStorage.setItem('user_login', JSON.stringify(res.data.user));
            setIsLogin(true)
            navigate("/home");
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleLogin()
    }, [])
    const handleSendMail = async () => {
        // Kiểm tra xem trường email có bị bỏ trống hay không
        if (!emailForget.trim()) {
            notification.error({
                message: "Email cannot be empty."
            });
            return;
        }

        // Kiểm tra định dạng email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailForget)) {
            notification.error({
                message: "Please enter a valid email address."
            });
            return;
        }

        let res = await mailerApi({ email: emailForget });
        console.log(res);
        notification.success({
            message: res.message
        })
        localStorage.setItem("reset_id", res.id);
        setShowModal(false);
        setEmailForget("");
    }
    return (
        <>
            <section className="h-screen">
                <div className="">
                    {/* <!-- Left column container with background--> */}
                    <div className="g-6 flex h-full flex-wrap items-center justify-center ">
                        <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                            <img
                                src={image}
                                className="w-6/13 h-1/3"
                                alt="Sample image"
                            />
                        </div>

                        {/* <!-- Right column container --> */}
                        <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                            <h1 className="mb-5 mt-3 text-4xl font-bold text-center">
                                Log in to Exclusive
                            </h1>
                            <form>
                                {/* <!--Sign in section--> */}
                                <div className="flex flex-row items-center justify-center lg:justify-start">
                                    <p className="mb-0 mr-4 text-lg">
                                        Sign in with
                                    </p>

                                    {/* <!-- Facebook button--> */}
                                    <TERipple rippleColor="light">
                                        <button
                                            onClick={FacebookAuthButtonClicked}
                                            type="button"
                                            className="mx-1 h-9 w-9 border-black-600 rounded-full bg-aqua uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        >
                                            {/* <!-- Facebook --> */}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mx-auto h-3.5 w-3.5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                                            </svg>
                                        </button>
                                    </TERipple>

                                    {/* <!-- Linkedin button --> */}
                                    <TERipple rippleColor="light">
                                        <button
                                            onClick={OnButtonClick}
                                            type="button"
                                            className="mx-1 h-9 w-9 border rounded-full bg-aqua uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        >
                                            {/* <!-- Linkedin --> */}
                                            <svg
                                                viewBox="-3 0 262 262"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="mx-auto h-3.5 w-3.5"
                                                preserveAspectRatio="xMidYMid"
                                                fill="#000000"
                                            >
                                                <g
                                                    id="SVGRepo_bgCarrier"
                                                    stroke-width="0"
                                                ></g>
                                                <g
                                                    id="SVGRepo_tracerCarrier"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                ></g>
                                                <g id="SVGRepo_iconCarrier">
                                                    <path
                                                        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                                        fill="#4285F4"
                                                    ></path>
                                                    <path
                                                        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                                        fill="#34A853"
                                                    ></path>
                                                    <path
                                                        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                                        fill="#FBBC05"
                                                    ></path>
                                                    <path
                                                        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                                        fill="#EB4335"
                                                    ></path>
                                                </g>
                                            </svg>
                                        </button>
                                    </TERipple>
                                </div>
                                {/* <!-- Separator between social media sign in and email/password sign in --> */}
                                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                    <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                                        Or
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label
                                        for="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        onChange={handleChange}
                                        value={user.email}
                                        name="email"
                                        id="email"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your email"
                                        required=""
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        for="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        onChange={handleChange}
                                        value={user.password}
                                        name="password"
                                        id="password"
                                        placeholder="••••••••"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required=""
                                    />
                                </div>

                                <div className="mb-6 flex items-center justify-between">
                                    {/* <!--Forgot password link--> */}
                                    <div className="cursor-pointer" onClick={() => setShowModal(true)}>Forgot password?</div>
                                </div>
                                {/* <!-- Login button --> */}
                                <div className="text-center lg:text-left ">
                                    <TERipple rippleColor="light">
                                        <button
                                            onClick={handleLogin}
                                            type="button"
                                            className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                        >
                                            Login
                                        </button>
                                    </TERipple>

                                    {/* <!-- Register link --> */}
                                    <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                                        Don't have an account?{" "}
                                        <Link
                                            to="/register"
                                            className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                                        >
                                            Register
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <TEModal show={showModal} setShow={setShowModal}>
                <TEModalDialog centered="true">
                    <TEModalContent>
                        <TEModalHeader>
                            <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                                Quên mật khẩu
                            </h5>
                            <button
                                type="button"
                                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-6 w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </TEModalHeader>
                        <TEModalBody>
                            <div>
                                <div className="text-red-500 italic">* vui lòng nhập đúng email </div>
                                <div className="mt-4">
                                    <TEInput type="email" label="Email" id="email" onChange={(e) => setEmailForget(e.target.value)} value={emailForget}></TEInput>
                                </div>
                            </div>
                        </TEModalBody>
                        <TEModalFooter>
                            <TERipple rippleColor="light">
                                <button
                                    type="button"
                                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </TERipple>
                            <TERipple rippleColor="light">
                                <button
                                    type="button"
                                    className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                    onClick={handleSendMail}
                                >
                                    Submit
                                </button>
                            </TERipple>
                        </TEModalFooter>
                    </TEModalContent>
                </TEModalDialog>
            </TEModal>
        </>
    );
}
