import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import "./css/Checkout.css"
import { useLocation } from 'react-router-dom';

const accessToken = sessionStorage.getItem('utoken');

let config = {

};
if (accessToken) {
    config = {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) }
    };
}

function Checkout() {
    const location = useLocation();
    const selectedProducts = location.state;
    // console.log("yahaloo", selectedProducts);
    const [address, setAddess] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8088/api/user/address/default', config)
            .then(response => {
                setAddess(response.data.data);
                // console.log(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const [selectedServiceId, setSelectedServiceId] = useState(1);
    const shippingServices = [
        { id: 1, name: 'Tiết kiệm', cost: 99999, description: 'Từ 5 đến 7 ngày' },
        { id: 2, name: 'Nhanh', cost: 199999, description: 'Từ 2 đến 3 ngày' }
    ];

    const handleServiceClick = (id) => {
        setSelectedServiceId(id);
    };
    const [selectedPaymentId, setSelectedPaymentId] = useState(1);
    const paymentMethods = [
        { id: 1, name: 'Khi nhận hàng', description: 'Phí thu hộ: ₫0 VNĐ' },
        { id: 2, name: 'Ví VN pay', description: 'Giảm đến 20.000₫' }
    ];

    const handlePaymentClick = (id) => {
        setSelectedPaymentId(id);
    };
    const billReq = {
        paymentMethod: paymentMethods[selectedPaymentId].name,
        productsCartDto: selectedProducts,
        deliveryAddress : address,
        shippingService : shippingServices[selectedServiceId],
    }
    const handleOrderClick = () => {
        console.log(billReq)
    }
    return (
        <div className='address-background'>
            <div className='container checkout'>
                <div className='row delivery-address'>
                    <h5>
                        Địa chỉ nhận hàng
                    </h5>
                    <p>{address.receiver} | {address.phoneNumber} | {address.defaultAddress ? 'Địa chỉ mặc định' : ''}</p>
                    <p>Lời nhắn: {address.content}</p>
                    <p>Địa chỉ: {address.specificAddress}, {address.ward}, {address.province}, {address.district}</p>
                </div>
                <div className='row product-order'>
                    <h5>
                        Sản phẩm
                    </h5>
                    <div>
                        {selectedProducts.length > 0 ? (
                            <table className="payment-table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedProducts.map((product) => (
                                        <tr key={product.productDetailDto.id}>
                                            <td>
                                                <img src={product.productDetailDto.imageUrl} alt={product.productDetailDto.productDto.name} className='product-detail-img' />
                                                {product.productDetailDto.productDto.name}
                                            </td>
                                            <td>{product.quantity}</td>
                                            <td>
                                                <del>{product.productDetailDto.price}₫</del> {product.productDetailDto.price - (product.productDetailDto.price * product.productDetailDto.productDto.discount.value) / 100}₫
                                            </td>
                                            <td>
                                                {(product.productDetailDto.price - (product.productDetailDto.price * product.productDetailDto.productDto.discount.value) / 100) * product.quantity}
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
                <div className='row shipping-payment'>
                    <div className='col-md-4'>
                        <h5>
                            Vận chuyển
                        </h5>
                        <div className='select-shipping'>
                            <div
                                className={`service-block ${selectedServiceId === 1 ? 'selected' : ''}`}
                                onClick={() => handleServiceClick(1)}
                            >
                                <p>{shippingServices[0].name} | {shippingServices[0].cost}₫</p>
                                <p>{shippingServices[0].description}</p>
                            </div>

                            <div
                                className={`service-block ${selectedServiceId === 2 ? 'selected' : ''}`}
                                onClick={() => handleServiceClick(2)}
                            >
                                <p>{shippingServices[1].name} | {shippingServices[1].cost}₫</p>
                                <p>{shippingServices[1].description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <h5>
                            Thanh toán
                        </h5>
                        <div className='select-shipping'>
                            <div
                                className={`payment-block ${selectedPaymentId === 1 ? 'selected' : ''}`}
                                onClick={() => handlePaymentClick(1)}
                            >
                                <p>{paymentMethods[0].name}</p>
                                <p>{paymentMethods[0].description}</p>
                            </div>

                            <div
                                className={`payment-block ${selectedPaymentId === 2 ? 'selected' : ''}`}
                                onClick={() => handlePaymentClick(2)}
                            >
                                <p>{paymentMethods[1].name}</p>
                                <p>{paymentMethods[1].description}</p>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-9'></div>
                        <div className='col-md-3'>
                            <button className='orderBtn' onClick={handleOrderClick}>Đặt hàng</button>
                        </div>
                    </div>
                </div>

            </div >
        </div >
    )
}

export default Checkout;