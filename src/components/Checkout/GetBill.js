import React from "react";
import SmallMenu from "../Profile/SmallMenu";
import axios from 'axios';
import { useState, useEffect } from 'react';

const accessToken = sessionStorage.getItem('utoken');
let config = {};
if (accessToken) {
    config = {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) },
    };
}

function GetBill() {
    const [billOrders, setBillOrders] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8088/api/user/order', config)
            .then((response) => {
                console.log(response.data.data);
                setBillOrders(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className='address-background'>
            <div className='container address'>
                <div className='row'>
                    <div className='col-md-2 '>
                        <SmallMenu></SmallMenu>
                    </div>
                    <div className='col-md-8 address-col-backgound'>
                        <div>
                            {billOrders.length > 0 ? (
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th>Sản phẩm</th>
                                            <th>Đơn giá</th>
                                            <th>Thành tiền</th>
                                            <th>Trạng thái </th>
<th>Thao tác</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {billOrders.map((billOrder) => (
                                            <tr key={billOrder.id}>
                                                <td>
                                                    {billOrder.productBills.map((productBill) => (
                                                        <div key={productBill.id}>
                                                            <img className="product-bill-img" src={productBill.productDetail.imageUrl} alt={productBill.productDetail.productDto.name} />
                                                            {productBill.productDetail.productDto.name} x {productBill.quantity}
                                                        </div>
                                                    ))}
                                                </td>
                                                {/* <td>
                                                    {billOrder.productBills.map((productBill) => (
                                                        <div key={productBill.id}>
                                                            <p>{productBill.quantity}</p>
                                                        </div>
                                                    ))}
                                                </td> */}
                                                <td>
                                                    {billOrder.productBills.map((productBill) => (
                                                        <div key={productBill.id}>
                                                            <p>{productBill.productDetail.price}</p>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>
                                                    {billOrder.productBills.map((productBill) => (
                                                        <div key={productBill.id}>
                                                            <p>{productBill.productDetail.price * productBill.quantity}</p>
                                                        </div>
                                                    ))}
                                                </td>
                                                <td>{billOrder.status}</td>
                                                <td>
                                                    <button className="cancel-order">Huỷ đơn</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            ) : (
                                <p>Không có sản phẩm nào trong giỏ hàng.</p>
                            )}
                        </div>
                    </div>

                    <div className='col-md-2'></div>
                </div>
            </div >
        </div >
    )
}
export default GetBill;