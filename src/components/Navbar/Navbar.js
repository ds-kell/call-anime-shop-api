import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style.css'

function Navbar() {
  return (
    <div className='menu-bar'>
      <div className='row'>
        <div className='col-md-10'></div>
        <div className='col-md-2 log-blk'>
          <div>
            <Link to="/register" className="login-text">Đăng ký | </Link>
            <Link to="/login" className="login-text"> Đăng nhập</Link>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <div className="">
            <Link to="/">
              <div className='shopName'>VaANH</div>
            </Link>
          </div>
        </div>
        <div className='col-md-6'>
          <form className="form-inline">
            <input
              type="text"
              className="search-box"
              placeholder="Search"
            />
            <button type="submit" className="search-btn">Search</button>
          </form>
        </div>
        <div className='col-md-1 cart-blk'>
          <div>
            <Link to="/cart" className="cart-text">Giỏ hàng</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;