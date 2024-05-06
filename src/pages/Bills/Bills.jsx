import { Button, Form, Input, Modal, Popconfirm, Table, message, notification } from "antd";

import { useEffect, useState } from "react";
import publicAxios from "../../config/publicAxios";
import { formatCurrency } from "../../helper/formatMoney";
//

const columns = (handleChangeStatus, handlePay) => [
    {
        title: "STT",
        dataIndex: "index",
        key: "index",
        render: (_, record, index) => index + 1,
    },
    {
        title: "Customer",
        dataIndex: "fullname",
        key: "fullname",
    },
    {
        title: "Total Price",
        dataIndex: "total_price",
        key: "price",
        render: (total_price) => formatCurrency(total_price),
    },
    {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        render: (_, record) => (
            <div
                style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                }}
            >
                <span>{record.address}</span>
                {record.address.length > 150 && (
                    <span
                        className="read-more"
                        onClick={() => handleReadMore(record.address)}
                    >
                        Xem thêm
                    </span>
                )}
            </div>
        ),
    },
    {
        title: "Date",
        dataIndex: "bill_date",
        key: "date",
        render: (_, record) => {
            const date = new Date(record.bill_date);
            const formattedDate = `${date.getDate()}/${
                date.getMonth() + 1
            }/${date.getFullYear()}`;
            return formattedDate;
        },
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, record) => <span>{record.status.toUpperCase()}</span>,
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <>
                {record.status === "unpaid" ? (
                    <>
                        <Popconfirm
                            title="Cancel"
                            description="Are you sure to pay this bill?"
                            onConfirm={() => handlePay(record)}
                            onCancel={() => {}}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button style={{ marginLeft: 10 }} danger>
                                Pay
                            </Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Pay"
                            description="Are you sure to cancel this bill?"
                            onConfirm={() => handleChangeStatus(record)}
                            onCancel={() => {}}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button style={{ marginLeft: 10 }} danger>
                                Cancel
                            </Button>
                        </Popconfirm>
                    </>
                ) : null}
            </>
        ),
    },
];
export default function Bills() {
    const [listBills, setListBills] = useState([]);
    const user_name = JSON.parse(localStorage.getItem("user_login")).user_name;

    const user_id = JSON.parse(localStorage.getItem("user_login")).user_id;
    const getAllBills = async () => {
        const res = await publicAxios.get(`/api/v1/bill-detail/${user_id}`);
        // console.log(res.data);
        setListBills(res.data);
    };
    const [checkBill, setCheckBill] = useState("");
    const handleChangeStatus = async (record) => {
        console.log(record);
        try {
            const res = await publicAxios.patch(
                `/api/v1/bill-detail/${user_id}/${record.bill_id}`,
                {
                    status: "cancel",
                }
            );
            getAllBills();
        } catch (error) {
            console.log(error);
        }
    };
    const handlePay = async (record) => {
        console.log(record)
        try {
            const res = await publicAxios.post(
                `/api/v1/bill-detail/payment/${user_id}/${record.bill_id}`,
                { record }
            );
            console.log(res.data);
            if (res.data.success === true) {
                console.log(res.data.data.order_url);
                notification.info({
                    message: "Đang chuyển sang trang thanh toán, hãy chờ...",
                });
                setTimeout(() => {
                    window.open(res.data.data.order_url, "_blank");
                }, 3000);
            }
            const app_trans_id = res.data.data.app_trans_id;
            setCheckBill(app_trans_id);
            // console.log(app_trans_id)
        } catch (error) {
            notification.error({
                message: "Đã xảy ra lỗi, vui lòng thử lại",
            });
        }
    };
    const handleCheckStatus = async (app_trans_id) => {
       if (app_trans_id !== "") {
        try {
            const res2 = await publicAxios.post(
                `/api/v1/bill-detail/check-status-order/${app_trans_id}`
            );
            console.log(res2);
            // Xử lý kết quả ở đây
            if(res2.data.data.return_code == 1){
                getAllBills();
            }
        } catch (error) {
            // Xử lý lỗi ở đây
            console.error("Có lỗi khi kiểm tra trạng thái giao dịch: ", error);
        }}

    };
    useEffect(() => {
        getAllBills();
    }, []);
    useEffect(() => {
        const checkPaymentStatus = () => {
            // Hàm này sẽ được gọi khi window/tab trở nên active sau khi người dùng thanh toán và trở lại
            handleCheckStatus(checkBill); // Giả sử bạn đã lưu `app_trans_id` sau khi gọi hàm handlePay
        };

        window.addEventListener("focus", checkPaymentStatus);

        // Cleanup
        return () => window.removeEventListener("focus", checkPaymentStatus);
    }, [checkBill]); // Đảm bảo bạn đã lưu app_trans_id vào state hoặc context để sử dụng ở đây
    return (
        <div className="flex justify-center items-center">
            <div>
                <div>
                    <h1 className="text-3xl font-bold text-center mb-6">
                        Bills
                    </h1>
                </div>
                <div>
                    <Table
                        className="ml-5"
                        dataSource={listBills}
                        columns={columns(handleChangeStatus, handlePay)}
                    />
                </div>
            </div>
        </div>
    );
}
