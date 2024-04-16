import { AiOutlineCamera } from "react-icons/ai";
import {
    AiOutlineStar,
    AiFillEye,
    AiOutlineHeart,
    AiOutlineArrowRight,
    AiOutlineArrowLeft,
} from "react-icons/ai";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import ScrollTop from "../../Components/ScrollTop";
// import "./HomePage.scss"
export default function HomePage() {
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const timezoneOffset = 7; // Múi giờ của Việt Nam (GMT+7)

        // Set the end date and time for the flash sale (example date)
        const endDate = new Date('2024-04-13T00:00:00');
        endDate.setHours(endDate.getHours() + timezoneOffset); // Chuyển múi giờ sang GMT+7

        const interval = setInterval(() => {
            const now = new Date();
            now.setHours(now.getHours() + timezoneOffset); // Chuyển múi giờ sang GMT+7

            const distance = endDate - now;

            const daysRemaining = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hoursRemaining = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutesRemaining = Math.floor(
                (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const secondsRemaining = Math.floor(
                (distance % (1000 * 60)) / 1000
            );

            setDays(daysRemaining);
            setHours(hoursRemaining);
            setMinutes(minutesRemaining);
            setSeconds(secondsRemaining);

            // If the countdown is over, stop the interval
            if (distance < 0) {
                clearInterval(interval);
                setDays(0);
                setHours(0);
                setMinutes(0);
                setSeconds(0);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    //
    const flashProducts = [
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc: "../../../src/assets/img/g92-2-500x500 1.png",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc: "../../../src/assets/img/g92-2-500x500 1.png",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc: "../../../src/assets/img/g92-2-500x500 1.png",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc: "../../../src/assets/img/g92-2-500x500 1.png",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc: "../../../src/assets/img/g92-2-500x500 1.png",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc: "../../../src/assets/img/g92-2-500x500 1.png",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
        },
    ];

    return (
        <div className="w-full h-full bg-white overflow-hidden">
            <div className="mt-3 flex justify-around items-center">
                <div
                    className="truncate w-3/5 h-1/2 mr-5 ml-5"
                    style={{ maxWidth: "1600px" }}
                >
                    <Slider {...settings}>
                        <div>
                            <h3>
                                <img
                                    src="../../../src/assets/img/Frame 560.png"
                                    alt="Slider Image"
                                />
                            </h3>
                        </div>
                        <div>
                            <h3>
                                <img
                                    src="../../../src/assets/img/Frame 560.png"
                                    alt="Slider Image"
                                />
                            </h3>
                        </div>
                        <div>
                            <h3>
                                <img
                                    src="../../../src/assets/img/Frame 560.png"
                                    alt="Slider Image"
                                />
                            </h3>
                        </div>
                    </Slider>
                </div>
            </div>
            {/* Banner flash sale */}
            <div className="products_sale">
                <div className="ml-0 md:ml-[120px] mt-8 w-[1285px] h-[103px] ">
                    <div className="flex items-center ">
                        <div className="w-[10px] h-[24px] bg-red-600 rounded-sm"></div>
                        <span className="text-red-600 ml-2">Today's</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex">
                            <h1 className="text-[36px] font-bold">
                                Flash Sale
                            </h1>
                            <div className="md:flex w-[334px] h-[50px] ml-8 items-center hidden">
                                <div className="flex-row items-center justify-center flex-1 mb-4">
                                    <p className="text-sm">Days</p>
                                    <p className="font-bold text-[32px] ml-1">
                                        {days}
                                    </p>
                                </div>
                                <div className="text-2xl font-bold text-red-600 ml-4 mr-2">
                                    :
                                </div>
                                <div className="flex-row items-center justify-center flex-1 mb-4">
                                    <p className="text-sm">Hours</p>
                                    <p className="font-bold text-[32px] ml-1">
                                        {hours}
                                    </p>
                                </div>
                                <div className="text-2xl font-bold text-red-600 ml-4 mr-2">
                                    :
                                </div>
                                <div className="flex-row items-center justify-center flex-1 mb-4">
                                    <p className="text-sm">Minutes</p>
                                    <p className="font-bold text-[32px] ml-1">
                                        {minutes}
                                    </p>
                                </div>
                                <div className="text-2xl font-bold text-red-600 ml-4 mr-2">
                                    :
                                </div>
                                <div className="flex-row items-center justify-center flex-1 mb-4">
                                    <p className="text-sm">Seconds</p>
                                    <p className="font-bold text-[32px] ml-1">
                                        {seconds}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* <div className="ml-8 md:flex hidden">
                            <button className="mr-2 w-[46px] h-[46px] bg-neutral-100 rounded-full flex items-center justify-center ">
                                <AiOutlineArrowLeft />
                            </button>
                            <button className="w-[46px] h-[46px] bg-neutral-100 rounded-full flex items-center justify-center">
                                <AiOutlineArrowRight />
                            </button>
                        </div> */}
                    </div>
                </div>
                {/* Products List */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8">
                    {flashProducts.map((item) => (
                        <div className="ml-0 md:ml-1">
                            <div className="w-full h-[350px]">
                                <div className="w-full h-[250px] border flex items-center justify-center content-center bg-neutral-100">
                                    <div className="w-[50%] h-[80%] flex items-center">
                                        <img
                                            src={item.imageSrc}
                                            className="max-w-full max-h-full"
                                            alt="Product Image"
                                        />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-[30%] h-[26px] bg-red-600 rounded-sm flex justify-center content-center mt-[-240px] ml-3">
                                        <p className="text-[14px] text-white">
                                            -40%
                                        </p>
                                    </div>
                                    <div className="w-[10%] h-[76px] mt-[-240px] ml-[50%]">
                                        <button className="w-[34px] h-[34px] bg-white border flex justify-center content-center items-center mb-2 rounded-full">
                                            <AiOutlineHeart />
                                        </button>
                                        <button className="w-[34px] h-[34px] bg-white border flex justify-center content-center items-center rounded-full">
                                            <AiFillEye />
                                        </button>
                                    </div>
                                </div>
                                <div className="w-full h-[41px] bg-black flex items-center justify-center mt-[-40px]">
                                    <button className="text-white">
                                        Add to cart
                                    </button>
                                </div>
                            </div>
                            {/* Product Info */}
                            <div className="w-full h-[84px] mt-[-85px] flex-col content-evenly">
                                <h1 className="text-[16px] font-bold">
                                    HAVIT HV-G92 Gamepad
                                </h1>
                                <div className="flex items-center">
                                    <p className="text-[16px] text-red-600">
                                        {item.price}
                                    </p>
                                    <p className="text-[16px] ml-2 line-through">
                                        $160
                                    </p>
                                </div>
                                <div className="w-[140px] h-[20px] flex">
                                    <div className="flex">
                                        {/* Rendering Stars */}
                                        {[...Array(5)].map((_, index) => (
                                            <button
                                                key={index}
                                                className="bg-white hover:bg-yellow-400"
                                            >
                                                <AiOutlineStar />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center content-center items-center">
                    <button className="w-[234px] h-[56px] text-[16px] bg-red-600 text-white rounded-sm">
                        View All Products
                    </button>
                </div>
                <hr className="h-px my-8 bg-black"></hr>

                {/*Category  */}

                <div className="categories mb-[300px]">
                    <div className=" ml-[120px] mt-8 w-[1285px] h-[103px]">

                
                {/* <div className="categories mb-[300px] hidden md:inline-block">
                    <div className=" ml-[120px] mt-8 w-[1285px] h-[103px] mt-[60px] ">
                        <div className="flex items-center ">
                            <div className="w-[10px] h-[24px] bg-red-600 rounded-sm"></div>
                            <span className="text-red-600 ml-2">
                                Categories
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between mb-5">
                            <h1 className="text-[36px] font-bold">
                                Browse By Category
                            </h1>
                            <div className="ml-8 flex">
                                <button className="mr-2 w-[46px] h-[46px] bg-neutral-100 rounded-full flex items-center justify-center ">
                                    <AiOutlineArrowLeft />
                                </button>
                                <button className="w-[46px] h-[46px] bg-neutral-100 rounded-full flex items-center justify-center">
                                    <AiOutlineArrowRight />
                                </button>
                            </div>
                        </div>
                        <div className="w-[1285px] h-[145px] flex justify-between">
                            <div className="w-[170px] h-[145px] border rounded flex-col content-center  ">
                                <div className="w-[56px] h-[56px] m-auto ">
                                    <img
                                        src="../../../src/assets/img/Category-CellPhone.png"
                                        alt="Product Image"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-[16px] font-bold text-center">
                                        Phones
                                    </h1>
                                </div>
                            </div>
                            <div className="w-[170px] h-[145px] border rounded flex-col content-center  ">
                                <div className="w-[56px] h-[56px] m-auto ">
                                    <img
                                        src="../../../src/assets/img/Category-Computer.png"
                                        alt="Product Image"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-[16px] font-bold text-center">
                                        Computer
                                    </h1>
                                </div>
                            </div>
                            <div className="w-[170px] h-[145px] border rounded flex-col content-center  ">
                                <div className="w-[56px] h-[56px] m-auto ">
                                    <img
                                        src="../../../src/assets/img/Category-SmartWatch.png"
                                        alt="Product Image"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-[16px] font-bold text-center">
                                        SmartWatch
                                    </h1>
                                </div>
                            </div>
                            <div className="w-[170px] h-[145px] border rounded flex-col content-center bg-red-600  ">
                                <div className="w-[56px] h-[56px] m-auto  ">
                                    <img
                                        className=""
                                        src="../../../src/assets/img/Category-Camera.png"
                                        alt="Product Image"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-[16px] font-bold text-center text-white">
                                        Camera
                                    </h1>
                                </div>
                            </div>
                            <div className="w-[170px] h-[145px] border rounded flex-col content-center  ">
                                <div className="w-[56px] h-[56px] m-auto ">
                                    <img
                                        src="../../../src/assets/img/Category-Headphone.png"
                                        alt="Product Image"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-[16px] font-bold text-center">
                                        HeadPhones
                                    </h1>
                                </div>
                            </div>
                            <div className="w-[170px] h-[145px] border rounded flex-col content-center  ">
                                <div className="w-[56px] h-[56px] m-auto ">
                                    <img
                                        src="../../../src/assets/img/Category-Gamepad.png"
                                        alt="Product Image"
                                    />
                                </div>
                                <div>
                                    <h1 className="text-[16px] font-bold text-center">
                                        Gaming
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Seller */}
                <div className="products_sale">
                    <div className="ml-0 md:ml-[120px] mt-8 w-[1285px] h-[103px]">
                        <div className="flex items-center">
                            <div className="w-[10px] h-[24px] bg-red-600 rounded-sm"></div>
                            <span className="text-red-600 ml-2">
                                This Month
                            </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex">
                                <h1 className="text-[36px] font-bold">
                                    Best Selling Products
                                </h1>
                            </div>
                        </div>
                    </div>
                    {/* Products List */}
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8">
                        {flashProducts.map((item) => (
                            <div className="ml-0 md:ml-6">
                                <div className="w-full h-[350px]">
                                    <div className="w-full h-[250px] border flex items-center justify-center content-center bg-neutral-100">
                                        <div className="w-[50%] h-[80%] flex items-center">
                                            <img
                                                src={item.imageSrc}
                                                className="max-w-full max-h-full"
                                                alt="Product Image"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-[30%] h-[26px] bg-red-600 rounded-sm flex justify-center content-center mt-[-240px] ml-3">
                                            <p className="text-[14px] text-white">
                                                -40%
                                            </p>
                                        </div>
                                        <div className="w-[10%] h-[76px] mt-[-240px] ml-[50%]">
                                            <button className="w-[34px] h-[34px] bg-white border flex justify-center content-center items-center mb-2 rounded-full">
                                                <AiOutlineHeart />
                                            </button>
                                            <button className="w-[34px] h-[34px] bg-white border flex justify-center content-center items-center rounded-full">
                                                <AiFillEye />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="w-full h-[41px] bg-black flex items-center justify-center mt-[-40px]">
                                        <button className="text-white">
                                            Add to cart
                                        </button>
                                    </div>
                                </div>
                                {/* Product Info */}
                                <div className="w-full h-[84px] mt-[-85px] flex-col content-evenly">
                                    <h1 className="text-[16px] font-bold">
                                        HAVIT HV-G92 Gamepad
                                    </h1>
                                    <div className="flex items-center">
                                        <p className="text-[16px] text-red-600">
                                            {item.price}
                                        </p>
                                        <p className="text-[16px] ml-2 line-through">
                                            $160
                                        </p>
                                    </div>
                                    <div className="w-[140px] h-[20px] flex">
                                        <div className="flex">
                                            {/* Rendering Stars */}
                                            {[...Array(5)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    className="bg-white hover:bg-yellow-400"
                                                >
                                                    <AiOutlineStar />
                                                </button>
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-[12px]">(88)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center content-center items-center">
                        <button className="w-[234px] h-[56px] text-[16px] bg-red-600 text-white rounded-sm">
                            View All Products
                        </button>
                    </div>
                </div>
                <hr className="h-px my-8 bg-black"></hr>
                <div class="image-container mx-auto">
                    <img
                        src="../../../src/assets/img/Frame 600.png"
                        alt="Product Image"
                        class="max-w-[100%] w-auto h-auto md:h-[500px] mx-auto object-cover"
                    />
                </div>

                {/* Explore Our Products */}
                <div>
                    <div className="products_sale">
                        <div className="ml-0 md:ml-[120px] mt-8 w-[1285px] h-[103px]">
                            <div className="flex items-center">
                                <div className="w-[10px] h-[24px] bg-red-600 rounded-sm"></div>
                                <span className="text-red-600 ml-2">
                                    Our Products
                                </span>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex">
                                    <h1 className="text-[36px] font-bold">
                                        Explore Our Products
                                    </h1>
                                </div>
                                {/* <div className="ml-8 flex">
                                    <button className="mr-2 w-[46px] h-[46px] bg-neutral-100 rounded-full flex items-center justify-center ">
                                        <AiOutlineArrowLeft />
                                    </button>
                                    <button className="w-[46px] h-[46px] bg-neutral-100 rounded-full flex items-center justify-center">
                                        <AiOutlineArrowRight />
                                    </button>
                                </div> */}
                            </div>
                        </div>
                        {/* Products List */}
                        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-8">
                            {flashProducts.map((item) => (
                                <div className="ml-0 md:ml-6">
                                    <div className="w-full h-[350px]">
                                        <div className="w-full h-[250px] border flex items-center justify-center content-center bg-neutral-100">
                                            <div className="w-[50%] h-[80%] flex items-center">
                                                <img
                                                    src={item.imageSrc}
                                                    className="max-w-full max-h-full"
                                                    alt="Product Image"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <div className="w-[30%] h-[26px] bg-red-600 rounded-sm flex justify-center content-center mt-[-240px] ml-3">
                                                <p className="text-[14px] text-white">
                                                    -40%
                                                </p>
                                            </div>
                                            <div className="w-[10%] h-[76px] mt-[-240px] ml-[50%]">
                                                <button className="w-[34px] h-[34px] bg-white border flex justify-center content-center items-center mb-2 rounded-full">
                                                    <AiOutlineHeart />
                                                </button>
                                                <button className="w-[34px] h-[34px] bg-white border flex justify-center content-center items-center rounded-full">
                                                    <AiFillEye />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="w-full h-[41px] bg-black flex items-center justify-center mt-[-40px]">
                                            <button className="text-white">
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                    {/* Product Info */}
                                    <div className="w-full h-[84px] mt-[-85px] flex-col content-evenly">
                                        <h1 className="text-[16px] font-bold">
                                            HAVIT HV-G92 Gamepad
                                        </h1>
                                        <div className="flex items-center">
                                            <p className="text-[16px] text-red-600">
                                                {item.price}
                                            </p>
                                            <p className="text-[16px] ml-2 line-through">
                                                $160
                                            </p>
                                        </div>
                                        <div className="w-[140px] h-[20px] flex">
                                            <div className="flex">
                                                {/* Rendering Stars */}
                                                {[...Array(5)].map(
                                                    (_, index) => (
                                                        <button
                                                            key={index}
                                                            className="bg-white hover:bg-yellow-400"
                                                        >
                                                            <AiOutlineStar />
                                                        </button>
                                                    )
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-[12px]">
                                                    (88)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-center content-center items-center">
                            <button className="w-[234px] h-[56px] text-[16px] bg-red-600 text-white rounded-sm">
                                View All Products
                            </button>
                        </div>
                    </div>

                    {/* Second Section */}
                </div>
                <hr className="h-px my-8 bg-black"></hr>

                <div class="border-b border-stroke pt-[60px] dark:border-dark-3 md:pt-0">
                    <div class="container mx-auto">
                        <div class="-mx-4 flex flex-wrap">
                            <div class="w-full px-4 md:w-1/3">
                                <div class="mb-[60px] text-center md:mt-[60px]">
                                    <div class="mx-auto mb-7 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-1 dark:bg-dark-2 dark:shadow-none">
                                        <img
                                            src="../../../src/assets/img/Services.png"
                                            alt="Product Image"
                                        />
                                    </div>

                                    <div>
                                        <h3 class="mb-[10px] text-xl font-semibold text-dark dark:text-white xl:text-2xl">
                                            FREE AND FAST DELIVERY
                                        </h3>
                                        <p class="mx-auto max-w-[275px] text-base text-body-color dark:text-dark-6">
                                            Free delivery for all orders over
                                            $140
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full px-4 md:w-1/3 md:border-x md:border-stroke md:dark:border-dark-3">
                                <div class="mb-[60px] text-center md:mt-[60px]">
                                    <div class="mx-auto mb-7 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-1 dark:bg-dark-2 dark:shadow-none">
                                        <img
                                            src="../../../src/assets/img/Services1.png"
                                            alt="Product Image"
                                        />
                                    </div>

                                    <div>
                                        <h3 class="mb-[10px] text-xl font-semibold text-dark dark:text-white xl:text-2xl">
                                            24/7 CUSTOMER SERVICE
                                        </h3>
                                        <p class="mx-auto max-w-[275px] text-base text-body-color dark:text-dark-6">
                                            Friendly 24/7 customer support
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full px-4 md:w-1/3">
                                <div class="mb-[60px] text-center md:mt-[60px]">
                                    <div class="mx-auto mb-7 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-1 dark:bg-dark-2 dark:shadow-none">
                                        <img
                                            src="../../../src/assets/img/Services.png"
                                            alt="Product Image"
                                        />
                                    </div>

                                    <div>
                                        <h3 class="mb-[10px] text-xl font-semibold text-dark dark:text-white xl:text-2xl">
                                            MONEY BACK GUARANTEE
                                        </h3>
                                        <p class="mx-auto max-w-[275px] text-base text-body-color dark:text-dark-6">
                                            We return money within 30 days
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
