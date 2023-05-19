import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './css/GetCart.css'; // Import CSS file
import { Link, useNavigate,  Navigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { navigate } from 'gatsby';



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
  const initialSelectedRows = Array(productsInCart.length).fill(false);
  const [selectedRows, setSelectedRows] = useState(initialSelectedRows);
  const [messageCart, setMessageCart] = useState('');


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


  const handleCheckboxChange = (productId) => {
    setSelectedRows((prevSelectedRows) => {
      const productIndex = productsInCart.findIndex((product) => product.productDetailDto.id === productId);
      if (productIndex !== -1) {
        const updatedSelectedRows = [...prevSelectedRows];
        updatedSelectedRows[productIndex] = !updatedSelectedRows[productIndex];
        return updatedSelectedRows;
      }
      return prevSelectedRows;
    });
  };
  const navigate = useNavigate();

  const handleCheckout = () => {
    const selectedProducts = productsInCart.filter((product, index) => selectedRows[index]);
  
    if (selectedProducts.length === 0) {
      setMessageCart("Bạn vẫn chưa chọn sản phẩm nào để mua.");
    } else {
      console.log(selectedProducts.map(product => product.productDetailDto.id));
      setMessageCart("");
      navigate('/checkout', { state: selectedProducts });
    }
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
                <th></th> {/* Ô checkbox */}
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {productsInCart.map((product) => (
                <tr key={product.productDetailDto.id}>
                  <td>
                    <input type="checkbox" onChange={() => { handleCheckboxChange(product.productDetailDto.id); }} />
                  </td>
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
        <div>
          <center>
            <div className='message-cart'>
              {messageCart}
            </div>
            <button className='checkoutBtn' onClick={handleCheckout}>Thanh toán</button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default GetCart;
