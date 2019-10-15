import React from 'react';
import OrderForm from './components/orderForm.js';
import OrderList from './components/orderList.js';

class Root extends React.Component {

    render() {
      return (
        <div>
        <OrderForm />
        <OrderList />
        </div>
    )
  }
}

export default Root;
