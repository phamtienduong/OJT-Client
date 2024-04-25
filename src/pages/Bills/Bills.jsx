import { Button, Form, Input, Modal, Popconfirm, Table, message } from "antd";

import { useEffect, useState } from "react";
import publicAxios from "../../config/publicAxios";
import { formatCurrency } from "../../helper/formatMoney";
//

const columns = (handleChangeStatus) => [
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
            const formattedDate = `${date.getDate()}/${date.getMonth() + 1
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
                {record.status === "pending" ? (
                    <Popconfirm
                        title="Cancel"
                        description="Are you sure to cancel this bill?"
                        onConfirm={() => handleChangeStatus(record)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button style={{ marginLeft: 10 }} danger>
                            Cancel
                        </Button>
                    </Popconfirm>
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
    const handleChangeStatus = async (record) => {
        // console.log(record);
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
    useEffect(() => {
        getAllBills();
    }, []);
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
                        columns={columns(handleChangeStatus)}
                    />
                </div>
            </div>
        </div>
    );
}
