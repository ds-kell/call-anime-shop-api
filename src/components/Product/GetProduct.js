import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react'
import ShowProduct from './ShowProduct';

const accessToken = sessionStorage.getItem('utoken');
let config = {

};
if (accessToken) {
  config = {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) }
  };
}

function GetProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('http://localhost:8088/api/products', config);
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>    
      <ShowProduct products={products} />
    </div>
  )
}

export { GetProduct };
