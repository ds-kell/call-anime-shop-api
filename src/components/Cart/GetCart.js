import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './css/GetCart.css'; // Import CSS file
import { Link, useNavigate } from 'react-router-dom';

const accessToken = sessionStorage.getItem('utoken');
let config = {};
if (accessToken) {
  config = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) },
  };
}

function GetCart() {
  const [productsInCart, setProductsInCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:8088/api/user/cart/product-in-cart', config)
      .then((response) => {
        console.log(response.data.data);
        setProductsInCart(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    // Xử lý logic để xoá sản phẩm trong giỏ hàng
  };

  const handleCheckout = () => {
    // Xử lý logic để thanh toán
    navigate('/checkout');

  };

  return (
    <div>

      <div className='container'>
        <div className='title-cart'>
          <h3>Giỏ hàng của bạn</h3>
        </div>
        {productsInCart.length > 0 ? (
          <table className="cart-table">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {productsInCart.map((product, index) => (
                <tr key={index}>
                  <td>{product.productDetailDto.productDto.name}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <del>
                      {product.productDetailDto.price}₫</del> {" "}
                    {product.productDetailDto.price -
                      (product.productDetailDto.price *
                        product.productDetailDto.productDto.discount.value) /
                      100}₫
                  </td>
                  <td>
                    {(product.productDetailDto.price -
                      (product.productDetailDto.price *
                        product.productDetailDto.productDto.discount.value) /
                      100) * product.quantity}
                  </td>
                  <td>
                    <div className='deleteBtn' onClick={() => handleDeleteProduct(product.productDetailDto.id)}>
                      Xoá
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Không có sản phẩm nào trong giỏ hàng.</p>
        )}
        <button className='checkoutBtn' onClick={handleCheckout}>Thanh toán</button>
      </div>
    </div>
  );
}

export default GetCart;
