import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home';
import Login from './components/Login/Login';
import useToken from './components/Login/useToken';
import SignUp from './components/Login/SignUp';
import ProductDetail from './components/Product/ProductDetail';
import GetCart from './components/Cart/GetCart';
import UserProfile from './components/Profile/UserProfile';
import DeliveryAddress from './components/Address/DeliveryAddress';
import Checkout from './components/Checkout/Checkout';
import GetBill from './components/Checkout/GetBill';
function App() {
  const { token, setToken } = useToken();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path='/register' element={<SignUp setToken={setToken} />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path='/cart' element={<GetCart />} />
        {/* <Route path='/checkout' component={<Checkout />} /> */}
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/address' element={<DeliveryAddress />} />
        <Route path='/bill-order' element={<GetBill />} />

        
      </Routes>
    </>
  );
}

export default App;
