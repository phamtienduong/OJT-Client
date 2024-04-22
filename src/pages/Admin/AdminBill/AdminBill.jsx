import { Button, Image, Input, Space, Table, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import publicAxios from "../../../config/publicAxios";

import { formatCurrency } from '../../../helper/formatMoney';

const columns = (handleChangeStatusBills) => [
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
    },
    {
        title: "Phone Number",
        dataIndex: "phone",
        key: "phone",
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
        title: "Total Price",
        dataIndex: "total_price",
        key: "total_price",
        render: (total_price) => formatCurrency(total_price),
    },
    // {
    //     title: "Details",
    //     dataIndex: "details",
    //     key: "details",
    //     width: 200,
    //     render: (details) => (
    //         <div style={{ height: 200, overflowY: "scroll" }}>
    //             {details.map((item, index) => (
    //                 <div key={index} style={{ borderBottom: "1px solid #333" }}>
    //                     <p>{item.product.product_name} </p>
    //                     <p>
    //                         <img
    //                             width={100}
    //                             src={item.product.image}
    //                             alt="item-img"
    //                         />
    //                     </p>
    //                     <p>
    //                         {item.product.description} | {item.quantity} |{" "}
    //                         {item.product.price}
    //                     </p>
    //                 </div>
    //             ))}
    //         </div>
    //     ),
    // },
    {
        title: "Action",
        key: "action",
        render: (_, order) => (
            <>
                {order.status == OrderStatus.DONE ||
                order.status == OrderStatus.CANCEL_ADMIN ? null : (
                    <>
                        <Button
                            onClick={() =>
                                handleChangeStatusBills(
                                    order.bill_id,
                                    OrderStatus.DONE
                                )
                            }
                        >
                            Accept
                        </Button>
                        <Button
                            danger
                            onClick={() =>
                                handleChangeStatusBills(
                                    order.bill_id,
                                    OrderStatus.CANCEL_ADMIN
                                )
                            }
                        >
                            Deny
                        </Button>
                    </>
                )}
            </>
        ),
    },
];


const OrderStatus = {
    PENDING: "pending",
    DONE: "accept",
    CANCEL_ADMIN: "admin_cancel",
    CANCEL_USER: "user_cancel",
};
export default function AdminBill() {

  const [allBills, setAllBills] = useState([]);

  const getAllBill = async () => {
    const res = await publicAxios.get("/api/v1/bill-detail");
    console.log(res.data);
    setAllBills(res.data);
  }

  const handleChangeStatusBills = async (bill_id, status) => {
    console.log(bill_id)
    console.log(status)
    switch (status) {
      case OrderStatus.DONE: {
        await publicAxios.patch(`/api/v1/bill-detail/admin_change/${bill_id}`,{status});
        break;
      }
      case OrderStatus.CANCEL_ADMIN: {
        await publicAxios.patch(`/api/v1/bill-detail/admin_change/${bill_id}`, {
            status
        });
        break;
      }
    }
    getAllBill()
  }

  useEffect(() => {
    getAllBill();
  }, [])

  return (
      <div className="row">
          <div className="col-12">
              <div className="page-title-box">
                  <h4 className=" text-3xl font-bold text-center">
                      Bills Management
                  </h4>
              </div>
              <div
                  style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                  }}
              >
                  <div>
                      <Space direction="vertical">
                          <Input.Search
                              placeholder="input search text"
                              allowClear
                              size="large"
                          />
                      </Space>
                  </div>
              </div>
              <Table
                  pagination={{ pageSize: 5 }}
                  dataSource={allBills}
                  style={{ marginBottom: "20px" }}
                  columns={columns(handleChangeStatusBills)}
              />
          </div>
      </div>
  );
}
