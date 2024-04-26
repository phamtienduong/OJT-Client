import { useEffect, useMemo, useState } from "react";
import Slider from "react-slick";
import publicAxios from "../../config/publicAxios";
import { formatCurrency } from "../../helper/formatMoney";
import { useNavigate } from "react-router-dom";
import { Card, Col, Rate, Row } from "antd";
import { getAllProducts } from "../../redux/reducer/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { customNavigate } from "../../app/hook";
// import "./HomePage.scss"
export default function HomePage() {
    const dispatch = useDispatch();
    const [productSales, setProductSales] = useState([]);
    const products = useSelector(state => state.productReducer.products);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getAllProducts());
    }, [])
    const getAvgStar = (data) => {
        if (data.length > 0) {
            return Math.round(data.reduce((a,b) => a + b.rating,0) / data.length);
        }
        return 0;
    } 
    useEffect(() => {
        const getProductsSale = async () => {
            const result = await products.filter((item) => parseFloat(item.discount) > 0).slice(0, 6)
            setProductSales(result);
        }
        getProductsSale();
    }, [products])
    const handleClickProduct = (id) => {
        customNavigate(navigate, `/product_detail/${id}`)
    }
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
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
                                        <div className="absolute top-0 left-0 w-12 h-12 bg-red-500 text-white text-center font-bold animate-pulse flex items-center justify-center rounded-sm">
                                            <span className="text-xs sm:text-sm md:text-base">SALE {product.discount * 100}%</span>
                                        </div>
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
                                                    <p className="mt-1 text-lg font-medium text-gray-900 text-center flex md:gap-4 gap-2">
                                                        <Rate disabled value={getAvgStar(product.reviews)} className='text-sm' />
                                                        <div>{getAvgStar(product.reviews)}/5</div>
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
                <div className="image-container mx-auto">
                    <img
                        src="../../../src/assets/img/Frame 600.png"
                        alt="Product Image"
                        className="max-w-[100%] w-auto h-auto md:h-[500px] mx-auto object-cover"
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
                                {[...products].splice(0, 8).map((product, index) => (
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
                                                        <p className="mt-1 text-lg font-medium text-gray-900 text-center flex md:gap-4 gap-2">
                                                            <Rate disabled allowHalf value={getAvgStar(product.reviews)} className='text-sm' />
                                                            <div>{getAvgStar(product.reviews)}/5</div>
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
                                onClick={() => navigate("/products")}
                                className="w-[234px] h-[56px] text-[16px] bg-red-600 text-white rounded-sm">
                                View All Products
                            </button>
                        </div>
                    </div>

                    {/* Second Section */}
                </div>
                <hr className="h-px my-8 bg-black"></hr>

                <div className="border-b border-stroke pt-[60px] dark:border-dark-3 md:pt-0">
                    <div className="container mx-auto">
                        <div className="-mx-4 flex flex-wrap">
                            <div className="w-full px-4 md:w-1/3">
                                <div className="mb-[60px] text-center md:mt-[60px]">
                                    <div className="mx-auto mb-7 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-1 dark:bg-dark-2 dark:shadow-none">
                                        <img
                                            src="../../../src/assets/img/Services.png"
                                            alt="Product Image"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="mb-[10px] text-xl font-semibold text-dark dark:text-white xl:text-2xl">
                                            FREE AND FAST DELIVERY
                                        </h3>
                                        <p className="mx-auto max-w-[275px] text-base text-body-color dark:text-dark-6">
                                            Free delivery for all orders over
                                            $140
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/3 md:border-x md:border-stroke md:dark:border-dark-3">
                                <div className="mb-[60px] text-center md:mt-[60px]">
                                    <div className="mx-auto mb-7 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-1 dark:bg-dark-2 dark:shadow-none">
                                        <img
                                            src="../../../src/assets/img/Services1.png"
                                            alt="Product Image"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="mb-[10px] text-xl font-semibold text-dark dark:text-white xl:text-2xl">
                                            24/7 CUSTOMER SERVICE
                                        </h3>
                                        <p className="mx-auto max-w-[275px] text-base text-body-color dark:text-dark-6">
                                            Friendly 24/7 customer support
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full px-4 md:w-1/3">
                                <div className="mb-[60px] text-center md:mt-[60px]">
                                    <div className="mx-auto mb-7 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white shadow-1 dark:bg-dark-2 dark:shadow-none">
                                        <img
                                            src="../../../src/assets/img/Services.png"
                                            alt="Product Image"
                                        />
                                    </div>



                                    <div>
                                        <h3 className="mb-[10px] text-xl font-semibold text-dark dark:text-white xl:text-2xl">
                                            MONEY BACK GUARANTEE
                                        </h3>
                                        <p className="mx-auto max-w-[275px] text-base text-body-color dark:text-dark-6">
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
