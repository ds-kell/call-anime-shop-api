import './css/product.css'
import React, { useState, } from 'react';
import { Link } from 'react-router-dom';


const ShowProduct = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const productsPerPage = 16;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredByCategory = selectedCategories.length > 0
    ? products.filter(product => selectedCategories.includes(product.category.name))
    : products;

  const filteredByBrand = selectedBrands.length > 0
    ? filteredByCategory.filter(product => selectedBrands.includes(product.brand.name))
    : filteredByCategory;

  const currentProducts = filteredByBrand.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredByBrand.length / productsPerPage);

  const categories = [...new Set(products.map(product => product.category.name))];
  const brands = [...new Set(products.map(product => product.brand.name))];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = [...selectedCategories];
    if (updatedCategories.includes(category)) {
      updatedCategories.splice(updatedCategories.indexOf(category), 1);
    } else {
      updatedCategories.push(category);
    }
    setSelectedCategories(updatedCategories);
  };

  const handleBrandChange = (brand) => {
    const updatedBrands = [...selectedBrands];
    if (updatedBrands.includes(brand)) {
      updatedBrands.splice(updatedBrands.indexOf(brand), 1);
    } else {
      updatedBrands.push(brand);
    }
    setSelectedBrands(updatedBrands);
  };

  return (
    <div className="container">
      <div className=' row product-block'>
        <div className='col-md-3'>
          <div className="sidebar">
            <div className="filter-group">
              <h4>Danh mục</h4>
              {categories.map(category => (
                <label key={category} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
            <div className="filter-group">
              <h4>Thương hiệu</h4>
              {brands.map(brand => (
                <label key={brand} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className='col-md-8'>
          <div className="product-list product-grid">
            {currentProducts.map((product) => (
              <div>
                <div className="product-item" key={product.id}>
                  <Link to={`/products/${product.id}`} className="product-link">
                    <img src={product.images[0].url} alt={product.name} className="product-image" />
                    <p>{product.name}</p>
                  </Link>
                </div>
                <div className="price-container">
                  <del className="original-price">{product.price.toLocaleString()}₫</del>
                  <p className="discounted-price">
                    {(product.price - (product.price * product.discount.value) / 100).toLocaleString()}₫
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className='row'>
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
