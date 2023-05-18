import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Style.css'

function Navbar() {
  const uToken = sessionStorage.getItem('utoken');
  const token = sessionStorage.getItem('token');
  const savedUsername = localStorage.getItem('username');
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear('token');
    sessionStorage.clear('utoken');
    // localStorage.clear('token');
    // localStorage.clear('utoken');
  }
  const handleCartClick = () => {
    if (uToken) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredOutside, setIsHoveredOutside] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsHoveredOutside(false);
  };

  const handleMouseEnterOutside = () => {
    setIsHoveredOutside(true);
  };

  const handleMouseLeaveOutside = () => {
    setIsHoveredOutside(false);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất ở đây
  };

  return (
    <div className='menu-bar'>
      <div className='row operations'>
        <div className='col-md-8'></div>
        <div className='col-md-2'>
          <a>Thông báo | </a>
          <a>Hỗ trợ | </a>
          <a>Ngôn ngữ </a>
        </div>
        <div className='col-md-2 log-blk'>
          {uToken ? (
            <div style={{ position: 'relative' }}>
              <a
                href="/profile"
                className="login-text"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
          {savedUsername}
              </a>
              {(isHovered || isHoveredOutside) && (
                <div className='hover-logout'
                  onMouseEnter={handleMouseEnterOutside}
                  onMouseLeave={handleMouseLeaveOutside}
                  onClick={logout}
                >
                  {/* Hiển thị nút logout khi hover */}
                  <a href="/login" >Logout</a>
                </div>
              )}
            </div>
          ) : (
            <div className='log-blk'>
              <div>
                <a href="/login" className="login-text">Đăng nhập | </a>
                <a href="/register" className="login-text"> Đăng ký</a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <div className="">
            <Link to="/">
              <div className='shopName'>VaAnh</div>
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
          <div className="cart-text" onClick={handleCartClick}>
            <a href="" >Giỏ hàng</a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;