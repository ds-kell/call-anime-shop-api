import './css/product.css'
import React, { useState,} from 'react';
import { Link } from 'react-router-dom';


const ShowProduct = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;

  // Tính toán chỉ mục bắt đầu và kết thúc của sản phẩm trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="product-grid">
        {currentProducts.map((product) => (
          <div className="product-item" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.images[0].url} alt={product.name} className="product-image" />
              <p>{product.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShowProduct;
