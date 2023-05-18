import React from 'react';
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

function GetDeliveryAddress() {
    const [deliveryAddress, setDeliveryAddress] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8088/api/user/address', config)
            .then((response) => {
                console.log(response.data.data);
                setDeliveryAddress(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {deliveryAddress.map((address) => (
                <div key={address.id}>
                    <p>{address.receiver} | {address.defaultAddress ? 'Địa chỉ mặc định' : ''}</p>
                    <p>Số điện thoại: {address.phoneNumber}</p>
                    <p>Lời nhắn: {address.content}</p>
                    <p>Địa chỉ: {address.specificAddress}, {address.ward}, {address.province}, {address.district}</p>
                </div>
            ))}
        </div>
    );
}

export default GetDeliveryAddress;
