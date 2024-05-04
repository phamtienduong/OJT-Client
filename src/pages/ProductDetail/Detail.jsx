import React, { useEffect, useState } from 'react';
import { Breadcrumb, Image, Rate, message, notification } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import publicAxios from '../../config/publicAxios';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../../helper/formatMoney';
import { useDispatch } from 'react-redux';
import { getCart } from '../../redux/reducer/cartReducer';
import DefaultAvatar from "../../assets/img/guest-user-250x250.jpg";

export default function Detail() {
    const [productDetail, setProductDetail] = useState({})
    const [comment, setComment] = useState()
    const [rating, setRating] = useState(5)
    const [listComment, setListComment] = useState([])
    const [wishlist, setWishList] = useState([])
    const [isWishList, setIsWishList] = useState(false)
    const [avgStar, setAvgStar] = useState(1);
    const [selectedColor, setSelectedColor] = useState("");
    const [flag, setFlag] = useState(false);
    const user = JSON.parse(localStorage.getItem('user_login'));
    const dispatch = useDispatch();

    const [allowCmt, setAllowCmt] = useState(true)
    const [mainImage, setMainImage] = useState("")
    // console.log(user);
    const { id } = useParams()
    const userLogin = JSON.parse(localStorage.getItem("user_login"));
    const user_id = userLogin && userLogin.user_id ? userLogin.user_id : "";
    const getProduct = async () => {
        const res = await publicAxios.get(`/api/v1/products/get-product/${id}`)
        // console.log(res);
        setProductDetail(res.data)
        setMainImage(res.data.default_image)
    }
    const addComment = async () => {
        if (!user?.user_id) {
            return notification.error({
                message: "Please log in before leaving a comment",
            });
        }
        if (comment && rating) {
            const data = {
                content: comment,
                rating: rating,
                user_id: user.user_id,
                product_id: productDetail.product_id
            }
            // console.log(data);
            try {
                const res = await publicAxios.post('api/v1/review/create', data)
                if (res.data.statusCode === 200) {
                    notification.success({
                        message: res.data.message
                    });
                    setRating(5)
                    setComment("")
                    setFlag(!flag)
                }
            } catch (error) {
                console.log(error);
            }
        }

    }

    const getAvgStar = async () => {
        console.log(id);
        const result = await publicAxios.get(`/api/v1/review/avg-start/${id}`)
        const data = result.data.data['AVG(rating)']
        // console.log("==> ::: ", Math.round(data));
        setAvgStar(Math.round(data));
    }

    const getListComment = async () => {
        const res = await publicAxios.get(`/api/v1/review/listReview/${id}`)
        console.log(res.data);
        setListComment(res.data)
        const mappedArr = res.data.map((item) => {
            if (item.user_id.user_id == user_id) {
                setAllowCmt(false)
            }
        })
    }
    //
    const getListCommentByUser = async () => {

    }
    // console.log(user.user_id);

    useEffect(() => {
        getWishList()
        getProduct();
        getAvgStar()
        getListComment()
        // handleWishlist()
    }, [flag]);



    const getWishList = async () => {
        const response = await publicAxios.get(`api/v1/favorite-products/${user.user_id}`);
        const wishlist1 = response.data;
        // console.log(wishlist);
        setWishList(wishlist1)
        // setFlag(!flag)
    }
    const handleWishlist = async () => {
        if (!user.user_id) {
            return notification.error({
                message: "Bạn phải đăng nhập trước khi thêm sản phẩm vào danh sách yêu thích",
            });
        }

        try {
            // Get the user's wishlist
            const response = await publicAxios.get(`api/v1/favorite-products/${user.user_id}`);
            const wishlist = response.data;
            // console.log(wishlist);
            setWishList(wishlist)
            // Check if the product is already in the wishlist
            const isProductInWishlist = wishlist.find(
                (product) => product.product_id.product_id == productDetail.product_id
            );
            // console.log(isProductInWishlist);

            if (isProductInWishlist) {

                // Product is already in the wishlist, do nothing
                return notification.error({
                    message: "Sản phẩm đã có trong danh sách yêu thích",
                });
            }

            // User has no wishlist or product is not in the wishlist, add the product
            const addResponse = await publicAxios.post(`api/v1/favorite-products/add`, {
                user_id: user.user_id,
                product_id: productDetail.product_id,
            });

            if (addResponse.status === 201) {

                setIsWishList(true)

                // Assuming 201 is the success code for creation
                notification.success({
                    message: 'Sản phẩm đã được thêm vào danh sách yêu thích',
                });

            } else {
                throw new Error('Could not add product to wishlist');
            }
        } catch (error) {
            // Handle errors related to API calls
            console.error(error);
            notification.error({
                message: error.message || 'Đã xảy ra lỗi khi thêm vào danh sách yêu thích',
            });
        }
    };

    const checkExistFav = () => {
        const check = wishlist.find((item) => {
            return item.product_id.product_id == id
        })

        if (check !== undefined) {
            setIsWishList(true)

        } else {
            setIsWishList(false)
        }
    }
    useEffect(() => {
        checkExistFav()
    }, [flag])
    const handleColorSelect = (color) => {
        console.log(color.color);
        setSelectedColor(color.color);
        setMainImage(color.image)
    };
    const handleAddToCart = async (id) => {
        // console.log(id);
        console.log(user.user_id);
        if (!user.user_id) {
            return notification.error({
                message: "Please log in before adding to cart",
            });
        }
        try {
            const data = {
                user_id: user.user_id,
                product_id: id
            }
            // console.log(data);
            const res = await publicAxios.post(`api/v1/cart/add`, data)
            dispatch(getCart(user.user_id));
            notification.success({
                message: res.data.message
            })
            // console.log(res);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="lg:px-28 lg:py-20 px-4 py-2">
                <div className="md:flex flex-col gap-y-20">
                    <div className="hidden md:inline-block">
                        <Breadcrumb
                            items={[
                                { title: "Account" },
                                { title: "Gaming" },
                                { title: "Havic HV G-92 Gamepad" },
                            ]}
                        />
                    </div>
                    <div className="md:flex gap-20">
                        <div className="flex w-3/5 justify-between">
                            <div
                                className="md:grid grid-cols-2 md:w-2/4 gap-y-2.5 hidden "
                                // style={{ display: "flex" }}
                            >
                                {productDetail.default_image && (
                                    <div
                                        className="flex justify-center items-center h-full border-2 rounded"
                                        style={{ width: 180 }}
                                        onClick={() =>
                                            setMainImage(
                                                productDetail.default_image
                                            )
                                        }
                                    >
                                        <img
                                            src={productDetail.default_image}
                                            alt=""
                                        />
                                    </div>
                                )}
                                {productDetail.impds &&
                                    productDetail.impds.map((item) => (
                                        <div
                                            key={item.id}
                                            className="border-2 rounded flex justify-center items-center h-full"
                                            onClick={() =>
                                                setMainImage(item.url)
                                            }
                                            style={{ width: 180 }}
                                        >
                                            <img
                                                src={item.url}
                                                alt={`Product ${item.id}`}
                                            />
                                        </div>
                                    ))}
                            </div>
                            <div className="md:w-2/4 border-2 border-slate-500 rounded">
                                {mainImage && (
                                    <div className="flex justify-center items-center h-full">
                                        <Image src={mainImage} alt="" />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:w-2/5">
                            <div className="flex flex-col gap-y-4">
                                <div className="text-2xl font-semibold">
                                    {productDetail.product_name}
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex gap-2.5 items-center">
                                        <div>
                                            <Rate
                                                disabled
                                                value={avgStar}
                                                className="text-sm"
                                            />
                                        </div>
                                        <div className="text-sm">
                                            {listComment.length} reviews
                                        </div>
                                    </div>
                                    <div className="px-4 border-l-2 border-green-500 text-green-400">
                                        In Stock
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                                    {productDetail.discount > 0 ? (
                                        <>
                                            <div className="text-lg sm:text-2xl text-red-500">
                                                {formatCurrency(
                                                    productDetail.price *
                                                        (1 -
                                                            productDetail.discount)
                                                )}
                                            </div>
                                            <div className="text-lg sm:text-2xl line-through">
                                                {formatCurrency(
                                                    +productDetail.price
                                                )}
                                            </div>
                                            <div className="text-xs sm:text-sm bg-red-500 text-center text-white px-1 sm:px-2 py-0.5 sm:py-1 border rounded">
                                                {" "}
                                                -{productDetail.discount * 100}%
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-lg sm:text-2xl">
                                                {formatCurrency(
                                                    +productDetail.price
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="text-sm font-semibold py-2">
                                    {productDetail.description}
                                </div>
                                <div className=" my-2 border border-slate-300"></div>
                                <div className="gap-8">
                                    <div className="flex gap-x-5 mb-5">
                                        <div>Colours:</div>
                                        {productDetail.product_info &&
                                            productDetail.product_info.map(
                                                (item, index) => (
                                                    <div
                                                        key={index + 1}
                                                        className="flex flex-col gap-y-4"
                                                    >
                                                        <div className="flex gap-4">
                                                            {item.color && (
                                                                <div
                                                                    className={`rounded-full border ${
                                                                        selectedColor ===
                                                                        item.color
                                                                            ? "w-[30px] h-[30px] border-4"
                                                                            : "w-[30px] h-[30px] border-0"
                                                                    }`}
                                                                    style={{
                                                                        backgroundColor:
                                                                            item.color,
                                                                    }}
                                                                    onClick={() =>
                                                                        handleColorSelect(
                                                                            item
                                                                        )
                                                                    }
                                                                ></div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                    <div className="flex gap-x-5">
                                        <div>Ram:</div>
                                        {productDetail.product_info &&
                                            productDetail.product_info.map(
                                                (item, index) => (
                                                    <div className="flex gap-4">
                                                        {/* Hiển thị dung lượng RAM */}
                                                        <div className="px-2 py-1 border border-black rounded">
                                                            {item.ram}
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>

                                <div className="flex md:gap-10 gap-0 md:gap-y-2 ">
                                    <div
                                        onClick={() =>
                                            handleAddToCart(
                                                productDetail.product_id
                                            )
                                        }
                                        className="bg-red-600 text-white py-2.5 px-8 text-sm rounded text-center w-1/2"
                                    >
                                        Buy Now
                                    </div>
                                    <div
                                        onClick={handleWishlist}
                                        className="border border-black flex items-center px-2.5 sm:w-max"
                                    >
                                        {/* <HeartOutlined /> */}
                                        {isWishList ? (
                                            <HeartFilled className="text-red-500" />
                                        ) : (
                                            <HeartOutlined />
                                        )}
                                    </div>
                                </div>
                                <div className="w-full flex flex-col justify-center  ">
                                    <div className="border border-black p-4 flex items-center gap-4">
                                        <i className="fa-solid fa-truck-fast text-xl"></i>
                                        <div>
                                            <div className="text-sm font-semibold">
                                                Free Delivery
                                            </div>
                                            <div className="font-semibold text-xs">
                                                Enter your postal code for
                                                Delivery Availability
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border border-black p-4 flex items-center gap-4">
                                        <i className="fa-solid fa-right-left"></i>
                                        <div>
                                            <div className="text-sm font-semibold">
                                                Return Delivery
                                            </div>
                                            <div className="font-semibold text-xs">
                                                Free 30 Days Delivery Returns.
                                                Details
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-8">
                        <div className="text-xl font-semibold mb-4">
                            Customer Reviews
                        </div>
                        <div className="border border-slate-200 p-4 rounded-lg space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        <img
                                            src={
                                                user
                                                    ? user.avatar
                                                    : DefaultAvatar
                                            }
                                            alt="Avatar"
                                            className="w-10 h-10 rounded-full"
                                        />
                                    </div>
                                    <div className="text-lg">
                                        {user ? user.user_name : "Guest"}
                                    </div>
                                </div>
                                <div className="text-xs text-slate-500">
                                    a few seconds ago
                                </div>
                            </div>
                            <div>
                                <textarea
                                    style={{ outline: "none" }}
                                    className="form-textarea mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    rows="4"
                                    placeholder="Write your review..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={addComment}
                                        className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                                    >
                                        Submit Review
                                    </button>
                                    {allowCmt ? (
                                        <div>
                                            <Rate
                                                value={rating}
                                                onChange={(value) =>
                                                    setRating(value)
                                                }
                                            />
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <div className="border border-slate-200 p-4 rounded-lg space-y-4">
                            {listComment.map((review, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="mr-4">
                                                <img
                                                    src={review.user_id.avatar}
                                                    alt="User avatar"
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            </div>
                                            <div className="text-lg">
                                                {review.user_id.user_name}
                                            </div>
                                        </div>
                                        <div className="text-xs text-slate-500">
                                            {new Date(
                                                review.review_date
                                            ).toLocaleString()}
                                        </div>
                                    </div>

                                    <div className="text-sm text-slate-600">
                                        {review.content}
                                    </div>

                                    <div>
                                        <Rate
                                            value={review.rating}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <div>Related Item</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                            <div className="flex flex-col gap-y-2 relative">
                                <div className="p-2 bg-slate-200">
                                    <div className="w-max px-2 py-1 bg-red-400 rounded absolute m-2.5 text-white">
                                        -30%
                                    </div>
                                    <div className="absolute right-[15px] mt-2 px-2.5 py-1 border border-black ">
                                        <HeartOutlined />
                                    </div>
                                    <img
                                        src="https://salt.tikicdn.com/ts/tmp/52/93/88/61ff58b8b3596ff29718c6aaa84d29b8.jpg"
                                        alt=""
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-xs md:text-base">
                                        HAVIT HV-G92 Gamepad
                                    </div>
                                    <div className="flex gap-4">
                                        <div>$120</div>
                                        <div className="line-through">$160</div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <Rate
                                            disabled
                                            defaultValue={4}
                                            className="text-xs md:text-sm"
                                        />
                                        <div>(150)</div>
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
