import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import publicAxios from "../../config/publicAxios";
import { formatCurrency } from "../../helper/formatMoney";
import { useNavigate } from "react-router-dom";
import { Card, Col, Rate, Row } from "antd";
import { customNavigate } from "../../app/hook";
// import "./HomePage.scss"
export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [productSales, setProductSales] = useState([]);
    const [avgStar, setAvgStar] = useState(1);

    const navigate = useNavigate();

    const getAllProducts = async () => {
        const res = await publicAxios.get("/api/v1/products/get-list");
        // console.log(res.data);
        const data = res.data;

        const result = data.filter((item) => parseFloat(item.discount) > 0).slice(0, 6)
        for (let i = 0; i < result.length; i++) {
            const res = await publicAxios.get(`/api/v1/review/avg-start/${result[i].product_id}`)
            const data = res.data.data['AVG(rating)']
            result[i]['avgStar'] = Math.round(data);
        }


        setProducts(data);
        setProductSales(result);
    }
    const getAvgStar = async () => {
        const result = await publicAxios.get(`/api/v1/review/avg-start/${products.product_id}`)
        const data = result.data.data['AVG(rating)']
        // console.log("==> ::: ", Math.round(data));
        setAvgStar(Math.round(data));
    }
    const handleClickProduct = (id) => {
        // console.log(id);
        // localStorage.setItem("idProductDetail", id)
        customNavigate(navigate,`/product_detail/${id}`)
    }

    // console.log(bestSeller);
    useEffect(() => {
        getAllProducts();
        getAvgStar()
    }, [])



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
                                    src="../../../src/assets/img/18s23fe-.webp"
                                    alt="Slider Image"
                                />
                            </h3>
                        </div>

                        <div>
                            <h3>
                                <img
                                    src="../../../src/assets/img/12-3-4s24.webp"
                                    alt="Slider Image"
                                />
                            </h3>
                        </div>
                        <div>
                            <h3>
                                <img
                                    src="../../../src/assets/img/12des-full-ipxsmax.webp"
                                    alt="Slider Image"
                                />
                            </h3>
                        </div>
                    </Slider>
                </div>
            </div>
            {/* Banner flash sale */}
            <div className="products_sale">

                <hr className="h-px my-8 bg-black"></hr>


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
                    <div className="ml-6 mr-6 lg:col-span-3">
                        <Row className=' flex justify-center ' gutter={[20, 20]}>
                            {productSales.map((product, index) => (
                                <Col onClick={() => handleClickProduct(product.product_id)} key={index} className='text-center m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 '>
                                    <div className="relative z-10">
                                        {product.discount == 0 ? <></> : (
                                            <div className="absolute top-0 left-0 w-12 h-12 bg-red-500 text-white text-center font-bold animate-pulse flex items-center justify-center rounded-sm">
                                                <span className="text-xs sm:text-sm md:text-base">SALE {product.discount * 100}%</span>
                                            </div>
                                        )}
                                    </div>
                                    <Card
                                        hoverable
                                        className='border-3'
                                        cover={<img alt={product.product_name} src={product.default_image} />}
                                    >
                                        <Card.Meta
                                            title={product.product_name}
                                            description={
                                                <div>
                                                    {
                                                        product.discount > 0 ? (
                                                            <div className='flex'>
                                                                <p className="text-lg  font-medium text-gray-900 line-through ">{formatCurrency(+product.price)} </p>
                                                                <p className="text-lg ml-2 font-medium text-red-600">
                                                                    {formatCurrency((product.price * (1 - product.discount)))}
                                                                </p>
                                                            </div>
                                                        ) : (
                                                            <p className="text-lg  font-medium text-gray-900 ">{formatCurrency(+product.price)} </p>

                                                        )
                                                    }
                                                    <p className="mt-1 text-lg font-medium text-gray-900 text-center">
                                                        <Rate disabled value={product.avgStar} className='text-sm' />

                                                    </p>
                                                </div>

                                            }
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    <div className="mt-7 flex justify-center content-center items-center">
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

                        <div className="ml-6 mr-6 lg:col-span-3">
                            <Row className=' flex justify-center ' gutter={[20, 20]}>
                                {products.splice(0, 8).map((product, index) => (
                                    <Col onClick={() => handleClickProduct(product.product_id)} key={index} className='text-center m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 '>
                                        <div className="relative z-10">
                                            {product.discount == 0 ? <></> : (
                                                <div className="absolute top-0 left-0 w-12 h-12 bg-red-500 text-white text-center font-bold animate-pulse flex items-center justify-center rounded-sm">
                                                    <span className="text-xs sm:text-sm md:text-base">SALE {product.discount * 100}%</span>
                                                </div>
                                            )}
                                        </div>
                                        <Card
                                            hoverable
                                            className='border-3'
                                            cover={<img alt={product.product_name} src={product.default_image} />}
                                        >
                                            <Card.Meta
                                                title={product.product_name}
                                                description={
                                                    <div>
                                                        {
                                                            product.discount > 0 ? (
                                                                <div className='flex'>
                                                                    <p className="text-lg  font-medium text-gray-900 line-through ">{formatCurrency(+product.price)} </p>
                                                                    <p className="text-lg ml-2 font-medium text-red-600">
                                                                        {formatCurrency((product.price * (1 - product.discount)))}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <p className="text-lg  font-medium text-gray-900 ">{formatCurrency(+product.price)} </p>

                                                            )
                                                        }
                                                        <p className="mt-1 text-lg font-medium text-gray-900 text-center">
                                                            <Rate disabled value={product.avgStar} className='text-sm' />

                                                        </p>
                                                    </div>

                                                }
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                        <div className="mt-7 flex justify-center content-center items-center">
                            <button
                                onClick={() => customNavigate(navigate, "/products")}
                                className="w-[234px] h-[56px] text-[16px] bg-red-600 text-white rounded-sm">
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
