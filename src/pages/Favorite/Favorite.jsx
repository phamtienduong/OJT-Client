import React, { useEffect, useState } from "react";
import { Button, Card, Col, message, Popconfirm, Rate, Row } from 'antd'
import publicAxios from "../../config/publicAxios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { formatCurrency } from "../../helper/formatMoney";
import { AiOutlineStar } from "react-icons/ai";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export default function Favorite() {

    const navigate = useNavigate()
    const [wishlist, setWishList] = useState([]);
    // số trang
    const [productTotal, setProductTotal] = useState(0)
    // trang hiện tại
    const [currentPage, setCurrentPage] = useState(1)
    // số sp trong một trang
    const [pageSize, setPageSize] = useState(6)

    const [flag, setFlag] = useState(false)

    const [avgStar, setAvgStar] = useState(1);




    const user = JSON.parse(localStorage.getItem('user_login'))
    // console.log(user);

    // vẽ danh sách các trang
    const renderPage = () => {
        // mảng lưu kết quả giao diện dùng để vẽ
        const page = []
        // lặp qua số trang để vẽ
        for (let i = 0; i < productTotal; i++) {
            page.push(
                <a
                    key={i}
                    href="#"
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              ${(i + 1) == currentPage ? "bg-indigo-600" : "white"}
              ${(i + 1) == currentPage ? "text-white" : "text-black"}
              `}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </a>
            )
        }
        return page
    }
    // đánh dấu trang hiện tại
    const handleUpDownPage = (status) => {
        // status quyết định lên trang hay lùi trang
        switch (status) {
            // 0 là lùi
            case 0:
                if (currentPage == 1) {
                    setCurrentPage(productTotal)
                } else {
                    setCurrentPage(currentPage - 1)
                }
                break
            // 1 là tăng
            case 1:
                if (currentPage == productTotal) {
                    setCurrentPage(1)
                } else {
                    setCurrentPage(currentPage + 1)
                }
                break
        }
    }
    const handleClickProduct = (id) => {
        // console.log(id.product_id);
        navigate(`/product_detail/${id.product_id}`)
    }
    useEffect(() => {
        const start = (currentPage - 1) * pageSize
        let end = (start) + pageSize

        const getWishList = async () => {
            const res = await publicAxios.get(`api/v1/favorite-products/${user.user_id}`)
            // console.log(res.data);
            const result = res.data
            if (end > result.length) {
                end = result.length
            }
            const newProduct = result.slice(start, end)

            setWishList(newProduct)
            setProductTotal(Math.ceil(result.length / pageSize))

        }
        getWishList()

    }, [currentPage, pageSize, flag])

    const handleDelete = async (id) => {
        console.log(id);
        try {
            const res = await publicAxios.delete(`api/v1/favorite-products/${id}`)
            console.log(res);
            if (res.status == 200) {
                notification.success({
                    message: res.data.message
                })
                const newWishList = wishlist.filter(item => item._id != id)
                setWishList(newWishList)
                setFlag(!flag)
            }

        } catch (error) {
            console.log(error);
        }
    }


    console.log(wishlist);
    return (
        <>
            <div className="bg-white">
                <div className=" mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Wishlist ({wishlist.length})
                        </h2>

                    </div>
                    <div className="ml-6 mr-6 lg:col-span-3">
                        <Row className=' flex justify-center ' gutter={[20, 20]}>
                            {wishlist.map((product, index) => (
                                <Col key={index} className='text-center m-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 '>
                                    <div className="relative z-10">
                                        {product.product_id.discount !== 0 ? <></> : (
                                            <div className="absolute top-0 left-0 w-12 h-12 bg-red-500 text-white text-center font-bold animate-pulse flex items-center justify-center rounded-sm">
                                                <span className="text-xs sm:text-sm md:text-base">SALE {product.product_id.discount * 100}%</span>
                                            </div>
                                        )}
                                    </div>
                                    <Card
                                        onClick={() => handleClickProduct(product.product_id)}
                                        hoverable
                                        className='border-3'
                                        cover={<img alt={product.product_id.product_name} src={product.product_id.default_image} />}
                                    >
                                        <Card.Meta
                                            title={product.product_id.product_name}
                                            description={
                                                <div>
                                                    {
                                                        product.product_id.discount > 0 ? (
                                                            <div className='flex'>
                                                                <p className="text-lg  font-medium text-gray-900 line-through ">{formatCurrency(+product.product_id.price)} </p>
                                                                <p className="text-lg ml-2 font-medium text-red-600">
                                                                    {formatCurrency((product.product_id.price * (1 - product.product_id.discount)))}
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
                                    <div class="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                        <div class="w-full">
                                            <Popconfirm
                                                title="Are you sure?"
                                                description="Do you want to remove this product from your wishlist?"
                                                onConfirm={() => handleDelete(product.favorite_product_id)}
                                                onCancel={() => { }}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <Button className="w-full h-[40px]" danger>Delete</Button>
                                            </Popconfirm>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>
                    {/* <div className=" mt-6 grid grid-cols-1 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {wishlist.map((product) => (
                            <div key={product.favorite_product_id} className="group relative">
                                <a
                                    key={product.product_id}
                                    onClick={() => handleClickProduct(product.product_id)}
                                    href={product.href}
                                    className="group border p-0 w-full m-auto"
                                >
                                    <div className="relative">
                                        {product.product_id.discount !== 0 && (
                                            <div className="absolute top-0 left-0 w-12 h-12 bg-red-500 text-white text-center font-bold animate-pulse flex items-center justify-center">
                                                <span className="text-xs sm:text-sm md:text-base">SALE {product.product_id.discount * 100}%</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="aspect-h-1 border aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                        <img
                                            src={product.product_id.default_image}
                                            alt={product.imageAlt}
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700 text-center">
                                        {product.product_id.product_name}
                                    </h3>
                                    <div className=" flex justify-center mt-1 text-lg font-medium text-gray-900 text-center">
                                        <p className="text-lg  font-medium text-gray-900 line-through ">{formatCurrency(+product.product_id.price)} </p>
                                        <p className="text-lg ml-2 font-medium text-red-600">
                                            {formatCurrency((product.product_id.price * (1 - product.product_id.discount)))}
                                        </p>
                                    </div>
                                    <p className="mt-1 text-lg font-medium text-gray-900 text-center">
                                        {[...Array(5)].map((_, index) => (
                                            <button
                                                key={index}
                                                className="bg-white hover:bg-yellow-400"
                                            >
                                                <AiOutlineStar />
                                            </button>
                                        ))}
                                    </p>
                                </a>
                                <div class="flex jusitfy-between flex-col lg:flex-row items-center mt-10 w-full space-y-4 lg:space-y-0 lg:space-x-4 xl:space-x-8">
                                    <div class="w-full">
                                        <Popconfirm
                                            title="Are you sure?"
                                            description="Do you want to remove this product from your wishlist?"
                                            onConfirm={() => handleDelete(product.favorite_product_id)}
                                            onCancel={() => { }}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <Button className="w-full h-[40px]" danger>Delete</Button>
                                        </Popconfirm>
                                    </div>

                                    <div class="w-full">
                                        <Button className="w-full h-[40px]">
                                            Add to cart
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div> */}
                    <div >
                        <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                            <div className="flex flex-1 justify-between sm:hidden">
                                <a
                                    href="#"
                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Previous
                                </a>
                                <a
                                    href="#"
                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Next
                                </a>
                            </div>
                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                                <div>

                                </div>
                                <div>
                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                        <a
                                            onClick={() => handleUpDownPage(0)}
                                            href="#"
                                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        >
                                            <span className="sr-only">Previous</span>
                                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                        {renderPage()}
                                        <a
                                            onClick={() => handleUpDownPage(1)}
                                            href="#"
                                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                        >
                                            <span className="sr-only">Next</span>
                                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                        </a>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
