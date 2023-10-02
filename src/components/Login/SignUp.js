import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { loginUser } from './Login';

function SignUp({ setToken }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8088/api/auth/signup', {
        username,
        email,
        password,
        authorities: ['CUSTOMER']
      });
      if (response.data.message === 'Created') {
        // Đăng nhập tự động
        const token = await loginUser({ username, password });
        if (token) {
          setToken(token);
          setShouldNavigate(true);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  if (shouldNavigate) {
    navigate('/');
  }
  const responseFacebook = (response) => {
    console.log(response);
    // Xử lý phản hồi từ đăng nhập với Facebook
  };

  const responseGoogle = (response) => {
    console.log(response);
    // Xử lý phản hồi từ đăng nhập với Google
  };
  return (
    <div className='row'>
      <div className="col-md-4">
        <img src='https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/197576694_2976330212688422_5574281264879702120_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=tBzL5yjA8YwAX_Ef1zK&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCoOPQeASbGM7auWOTVDS08XGaLscb3c6mmXzW8zYCydQ&oe=648E61F8' className='left-img' />
      </div>
      <div className="col-md-4">
        <div className='login_block'>
          <h4>
            Đăng ký
          </h4>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              {/* <div className='col-sm-4'>
                <p>Tên đăng nhập</p>
                <p>Email</p>
                <p>Mật khẩu</p>
              </div> */}
              <div className='col-sm-12'>
                <input placeholder='Tên đăng nhập' className='username-input' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input placeholder='email' className='username-input' type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input placeholder='Mật khẩu' className='username-input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <button type="submit" className='signup-btn'>Đăng ký</button>
          </form>
          <div>
            <p className='or-title'>__________________________ HOẶC __________________________</p>
            <div className="other-login">
              <div>
                <FacebookLogin
                  appId="YOUR_FACEBOOK_APP_ID"
                  fields="name,email,picture"
                  callback={responseFacebook}
                  buttonText="Đăng nhập với Facebook"
                  className="login-fb custom-button"
                />
              </div>

              <div>
                <GoogleLogin
                  clientId="YOUR_GOOGLE_CLIENT_ID"
                  buttonText="Đăng nhập với Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  className="login-gg custom-button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <img src='https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/315593324_676689953811942_6378600367626994891_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=GpHmNw2nWywAX9K4Y0X&_nc_ht=scontent.fhan14-4.fna&oh=00_AfBF5j0Tj7wqvFc0waOC-rCQWTq8hgyQTVe-u9hA3pUhdw&oe=646CE94D' className='right-img' />
      </div>
    </div>
  )
}
export default SignUp;
