    import React from 'react'
    import "./Cart.scss"
    import { Button, message, notification, Popconfirm, } from "antd";

    export default function Cart() {
        return (
            <div>
                <div className="w-[1140px] m-auto ">
                    <div className="text-center mb-4">
                        <h1 className="font-bold text-3xl">Your cart</h1>
                        <span>Products in the cart: 2 </span>
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

                                    <tr className="text-center">
                                        <td className="w-[86.77px] h-[115.15px] rounded">
                                            <img width={100} src="" alt="img"></img>
                                        </td>
                                        <td>
                                            <span>{ }</span> <br></br>
                                            <span
                                                //   onClick={() => handleClickProduct(item.product_product_id)}
                                                className="underline decoration-2 text-blue-500 cursor-pointer"
                                            >
                                                Review
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-quantity">
                                                -
                                            </button>
                                            <span className="ml-4 mr-4">{ }</span>
                                            <button className="btn-quantity" >
                                                +
                                            </button>
                                        </td>
                                        <td className="">
                                            {/* {(item.product_price)*(item.product_discount).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                        })} */}
                                            {/* {formatCurrency(item.product_price *(1- item.product_discount)* item.carts_quantity)} */}
                                        </td>
                                        <td>
                                            <Popconfirm
                                                title="Xoá sản phẩm"
                                                description="Bạn có muốn xoá sản phẩm?"
                                                //   onConfirm={(e) => confirm(e, item.carts_cart_id)}
                                                //   onCancel={cancel}
                                                okText="Đồng ý"
                                                cancelText="Không đồng ý"
                                            >
                                                <div className="w-[25px] h-[25px] rounded bg-red-700 text-white">
                                                    &times;
                                                </div>
                                            </Popconfirm>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="order-summary">
                            <div className="content-order">
                                <div className="name-order-summary ">
                                    <h1 className="text-xl mb-4">Cart Total</h1>
                                </div>
                                <div className="flex justify-between mt-4 pb-4 border-b-2 mb-4">
                                    <span>Subtotal::</span>
                                    <span>
                                        {/* {formatCurrency(totalMoney)} */}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-4 pb-4 border-b-2 mb-4">
                                    <span>Shipping:</span>
                                    <span>
                                        {/* {formatCurrency(totalMoney)} */}
                                    </span>
                                </div>
                                <div className="flex justify-between mt-4 pb-4 border-b-2 mb-4">
                                    <span>Total:</span>
                                    <span>
                                        {/* {formatCurrency(totalMoney)} */}
                                    </span>
                                </div>
                                <div className="">
                                    <button
                                        className="w-[302px] h-[48px] rounded-none bg-red-600 hover:bg-red-200 mb-3 text-white "
                                    // onClick={() => handleCheckout()}
                                    >
                                        PROCEED TO ORDER
                                    </button>
                                    <button
                                        className="w-[302px] h-[48px] rounded-none bg-stone-200 hover:bg-red-200 "
                                    // onClick={() => handleByMore()}
                                    >
                                        BUY MORE PRODUCTS
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
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
                    </div>
                </div>
            </div>
        )
    }
