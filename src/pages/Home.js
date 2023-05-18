import React from 'react';
import { GetProduct } from '../components/Product/GetProduct';
class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <GetProduct />
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    )
  }
}

export default Home;
