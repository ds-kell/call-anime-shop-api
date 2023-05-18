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
function App() {
  const { token, setToken } = useToken();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path='/register' element={<SignUp setToken={setToken} />} />
        {/* <Route path="/products/:productId" render={(props) => <ProductDetail productId={props.match.params.productId} />} /> */}
        {/* <Route path="/products/:productId" component={ProductDetail} /> */}
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path='/cart' element={<GetCart />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/address' element={<DeliveryAddress />} />

      </Routes>
    </>
  );
}

export default App;
