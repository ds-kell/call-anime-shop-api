import React, { useState } from 'react';

const SmallMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(true);

    const toggleDropdown = () => {
        // setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div>
            <nav className='profile-menu'>
                <ul>
                    <div>
                        <a href="profile" onClick={toggleDropdown}>
                            Thông tin người dùng
                        </a>
                        {isDropdownOpen && (
                            <ul>
                                <li>
                                    <a href="profile">Hồ sơ</a>
                                </li>
                                <li>
                                    <a href="address">Địa chỉ</a>
                                </li>
                                <li>
                                    <a href="wallet">Ví</a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <div>
                        <a href="bill-order">Đơn mua</a>
                    </div>
                    <div>
                        <a href="notification">Thông báo</a>
                    </div>

                </ul>
            </nav>
        </div>
    );
};

export default SmallMenu;
