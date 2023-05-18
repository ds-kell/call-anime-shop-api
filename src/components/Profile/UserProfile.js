import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Logout from '../Login/Logout';
import DateOfBirthForm from './DateOfBirth';
import './css/profile.css'
import SmallMenu from './SmallMenu';
const accessToken = sessionStorage.getItem('utoken');
let config = {};
if (accessToken) {
  config = {
    method: 'GET',
    headers: { Authorization: 'Bearer ' + accessToken.slice(1, -1) },
  };
}

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    // Gọi API để lấy thông tin người dùng
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8088/api/user/profile', config);
      // setUser(response.data.data)
      console.log(response.data.data);
      setAvatarUrl(response.data.data.avatarUrl);

      setFullName(response.data.data.fullName);

      setGender(response.data.data.gender);

      setPhoneNumber(response.data.data.phoneNumber);

      setEmail(response.data.data.accountDto.email);

      setUsername(response.data.data.accountDto.username);

    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleUpdateProfile = async e => {
    e.preventDefault();
    // Tạo đối tượng dữ liệu mới để cập nhật thông tin người dùng
    // const updatedUserData = {
    //   ...user,
    //   fullName,
    //   phoneNumber,
    //   dob,
    //   gender,
    //   avatarUrl
    // };
    // try {
    //   const response = await axios.put('http://localhost:8088/api/user', updatedUserData);
    //   // setUser(response.data);
    //   alert('Thông tin người dùng đã được cập nhật thành công!');
    // } catch (error) {
    //   console.error('Error updating user profile:', error);
    //   alert('Đã xảy ra lỗi khi cập nhật thông tin người dùng!');
    // }
  };

  // if (!user) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className='profile-background'>
      <div className='container profile'>
        <form onSubmit={handleUpdateProfile}>
          <div className='row'>
            <div className='col-md-2 '>
              <SmallMenu></SmallMenu>
            </div>
            <div className='col-md-2 profile-col-backgound'>
              <p>Tên đăng nhập</p>
              <p>Họ tên</p>
              <p>Số điện thoại</p>
              <p>Email</p>
              <p>Giới tính</p>
              <p>Ngày sinh</p>
            </div>
            <div className='col-md-4 profile-col-backgound'>
              <div className='username'>
                <input className='username-text'
                  // type="text"
                  value={username}
                  readOnly={true}
                />
              </div>
              <div className='fullname'>
                <input
                  type="text"
                  value={fullName ? fullName : ""}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className='phonenumber'>
                <input
                  type="text"
                  value={phoneNumber ? phoneNumber : ""}
                  readOnly={true}

                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </div><div className='email'>
                <input
                  type="text"
                  value={email ? email : ""}
                  readOnly={true}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="gender">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={handleGenderChange}
                />
                Nam
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={handleGenderChange}
                />
                Nữ
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={handleGenderChange}
                />
                Khác
              </div>
              <div className='dob'>
                <DateOfBirthForm />
              </div>
              <button type="submit" className='updateBtn'>Cập nhật</button>
            </div>
            <div className='col-md-2 profile-col-backgound'>
              <div>
                {{ avatarUrl } ? (
                  <img src={avatarUrl} alt="avatar" className='avatar-img' />
                ) : (
                  <p className='avatar-text'>avatar</p>
                )}
              </div>
              <div>
                <input
                  type="file"
                  // value={avatarUrl}
                  onChange={e => setAvatarUrl(e.target.value)}
                />
              </div>
            </div>
            <div className='col-md-2'></div>
          </div>
        </form>
      </div >
    </div >
  );
}
