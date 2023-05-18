import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ProductImageGallery from './ProductImageGallery';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SizeAndPrice from './SizeAndPrice';
import AddToCart from '../Cart/AddToCart';
const ProductDetail = () => {
  const [productDetails, setProductDetails] = useState([]);
  const { productId } = useParams();
  useEffect(() => {
    if (productId) {
      axios
        .get(`http://localhost:8088/api/products/${productId}`)
        .then(response => {
          setProductDetails(response.data.data);
          console.log(response.data);
        })
        .catch(error => console.log(error));
    }
  }, [productId]);
  // Tạo danh sách các URL
  const product = productDetails[0]; // Lấy phần tử đầu tiên từ danh sách

  const imageUrls = product && Array.isArray(product.productDto.images) ? product.productDto.images.map(image => image.url) : [];
  if (product && product.imageUrl) {
    imageUrls.push(product.imageUrl);
  }
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sizes = productDetails.map(product => product.size);
  const prices = productDetails.map(product => product.price);
  const countInStocks = productDetails.map(product => product.countInStock);
  
  return (
    <div className='container'>
      <div className='col-md-10 product-details'>
        <div className='row'>
          <div className='col-md-6'>
            {/* <ProductImageGallery imageUrls={imageUrls} /> */}
            <center>
              {imageUrls && imageUrls.length > 0 && (
                <div>
                  <Slider {...sliderSettings}>
                    {imageUrls.map((url, index) => (
                      <div key={index}>
                        <img src={url} alt={`Image ${index}`} className='product-details-images' />
                      </div>
                    ))}
                  </Slider>
                </div>
              )}
            </center>
          </div>
          <div className='col-md-6'>
            <div>
              {productDetails[0] && (
                <div>
                  <h3>{productDetails[0].productDto.name}</h3>
                  <p>{productDetails[0].productDto.description}</p>
                </div>
              )}
            </div>
            <div>
              <SizeAndPrice productDetails={productDetails}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
