import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './css/cart.css'

const accessToken = sessionStorage.getItem('utoken');
let config = {};
if (accessToken) {
  config = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) },
  };
}

const AddToCart = ({ productDetailId, quantity }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const uToken = sessionStorage.getItem('utoken');
    if (!uToken) {
      navigate('/login');
      return;
    }

    const payload = {
      productDetailId,
      quantity
    };
    console.log(payload)
    axios
      .post('http://localhost:8088/api/user/cart/add-product', payload, config)
      .then(response => {
        // Xử lý phản hồi thành công (nếu cần)
        console.log(response.data);
      })
      .catch(error => {
        // Xử lý lỗi (nếu có)
        console.error(error);
      });
  };
  const handleBuy = () => {
    const uToken = sessionStorage.getItem('utoken');
    if (!uToken) {
      navigate('/login');
      return;
    }
    else{
      navigate('/cart');
    }
    const payload = {
      productDetailId,
      quantity
    };
  };
  return (
    <div>
      <div className='row'>
        <div className='col-sm-2'></div>
        <div className='col-sm-10'>
          <div className='cartBtn'>
            <button className='addToCartBtn' onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
            <button className='buyBtn' onClick={handleBuy}>Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
