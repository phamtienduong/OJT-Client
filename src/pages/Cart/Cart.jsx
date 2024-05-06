import React, { useEffect, useState } from 'react'
import "./Cart.scss"
import { Button, Image, message, notification, Popconfirm, } from "antd";
import publicAxios from '../../config/publicAxios';
import { formatCurrency } from '../../helper/formatMoney';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCart } from '../../redux/reducer/cartReducer';

export default function Cart() {
    const dispatch = useDispatch();
    const [cartList, setCartList] = useState([])
    const [flag, setFlag] = useState(false)
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user_login'))

    let totalMoney = cartList.reduce((total, current) => {
        const discountedPrice = current.product_id.price * (1 - parseFloat(current.product_id.discount));
        const totalPrice = discountedPrice * current.quantity;
        return total + totalPrice;
    }, 0);
    const totalMoneyFormat = formatCurrency(totalMoney)
    console.log(totalMoneyFormat);
    const getProductCart = async () => {
        try {
            const res = await publicAxios.get(`/api/v1/cart/list/${user.user_id}`)
            console.log(res.data);
            setCartList(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    const handleIncrease = async (item) => {
        // console.log(parseInt(item.product_id.product_info.stock));
        console.log(item.product_id.product_info[0].stock);
        try {
            if (item.quantity >= item.product_id.product_info[0].stock) {
                message.warning("Đã đạt số lượng tối đa")
                return
            }
            console.log("item:: ", item);
            await publicAxios.put("api/v1/cart/update/incre", item);
            setFlag(!flag)
        } catch (error) {
            console.log(error);
        }
    };
    const handleDecrease = async (item) => {
        console.log("=>>>", item);
        try {
            if (item.quantity <= 1) {
                message.warning("Đã đạt số lượng tối thiểu")
                return
            }
            else {
                await publicAxios.put(`api/v1/cart/update/decre`, item);
                setFlag(!flag)
            }

        } catch (error) {
            console.log(error);
        }

    };
    const handleCheckout = async () => {
        navigate("/checkout");
    };


    const confirm = async (e, id) => {
        console.log(id);
        e.preventDefault();
        try {
            const res = await publicAxios.delete(`/api/v1/cart/${id}`)
            console.log(res);
            setCartList(prevCartList => prevCartList.filter(item => item.cart_id !== id));
            setFlag(!flag)
            message.success(res.data.message);
        } catch (error) {
            console.log(error);
        }

    }

    const handleByMore = () => {
        navigate("/products");
    };
    const handleClickProduct = (id) => {
        console.log(id);
        // localStorage.setItem("idProductDetail", id);
        navigate(`/product_detail/${id}`)
    };
    const cancel = (e) => { };
    console.log(cartList);
    useEffect(() => {
        // const user = JSON.parse(localStorage.getItem('user_login'))
        const userLogin = JSON.parse(localStorage.getItem("user_login"));
        dispatch(getCart(userLogin.user_id));
        getProductCart()
    }, [flag])
    return (
        <div>
            <div className="w-[1140px] m-auto ">
                <div className="text-center mb-4">
                    <h1 className="font-bold text-3xl">Your cart</h1>
                    <span>Products in the cart: {cartList.length} </span>
                </div>
                <div className="container-cart">
                    <div className="list_product">
                        <table className="table-auto" cellPadding={10} cellSpacing={10}>
                            <thead className=" thead-cart  h-[60.4px] text-center rounded">
                                <tr>
                                    <th>Image</th>
                                    <th>Infor</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartList.map((item) => (
                                    <tr key={item.cart_id} className="text-center">
                                        <td className="w-[86.77px] h-[115.15px] rounded">
                                            <Image width={100} src={item.product_id.default_image} alt={item.product_id.product_name} />
                                        </td>
                                        <td>
                                            <span>{item.product_id.product_name}</span> <br />
                                            <span
                                                onClick={() => handleClickProduct(item.product_id.product_id)}
                                                className="underline decoration-2 text-blue-500 cursor-pointer"
                                            >
                                                Xem lại
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-quantity" onClick={() => handleDecrease(item)}>
                                                -
                                            </button>
                                            <span className="ml-4 mr-4">{item.quantity}</span>
                                            <button className="btn-quantity" onClick={() => handleIncrease(item)}>
                                                +
                                            </button>
                                        </td>
                                        <td className="">
                                            {formatCurrency(
                                                item.product_id.price * (1 - parseFloat(item.product_id.discount)) * item.quantity
                                            )}
                                        </td>
                                        <td>
                                            <Popconfirm
                                                title="Xoá sản phẩm"
                                                description="Bạn có muốn xoá sản phẩm?"
                                                onConfirm={(e) => confirm(e, item.cart_id)}
                                                onCancel={cancel}
                                                okText="Đồng ý"
                                                cancelText="Không đồng ý"
                                            >
                                                <div className="w-[25px] h-[25px] rounded bg-red-700 text-white">&times;</div>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                ))}



                            </tbody>
                        </table>
                    </div>

                    <div className="order-summary">
                        <div className="content-order">
                            <div className="name-order-summary ">
                                <h1 className="text-xl mb-4">Cart Total</h1>
                            </div>
                            <div className="flex justify-between mt-4 pb-4 border-b-2 mb-4">
                                <span>Subtotal:</span>
                                <span>
                                    {formatCurrency(totalMoney)}
                                </span>
                            </div>
                            <div className="flex justify-between mt-4 pb-4 border-b-2 mb-4">
                                <span>Total:</span>
                                <span>
                                    {formatCurrency(totalMoney)}
                                </span>
                            </div>
                            <div className="">
                                <button
                                    className="w-[302px] h-[48px] rounded-none bg-red-600 hover:bg-red-200 mb-3 text-white "
                                    onClick={() => handleCheckout()}
                                >
                                    PROCEED TO ORDER
                                </button>
                                <button
                                    className="w-[302px] h-[48px] rounded-none bg-stone-200 hover:bg-red-200 "
                                    onClick={() => handleByMore()}
                                >
                                    BUY MORE PRODUCTS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='flex gap-2 items-center'>
                    <div className='flex'>
                        <input
                            className="w-[302px] h-12 pl-4 pr-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter coupon code"
                        />
                    </div>
                    <div>
                        <button className="h-12 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            Apply Coupon
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
    )
}
