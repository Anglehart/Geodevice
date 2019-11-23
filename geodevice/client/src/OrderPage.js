import React from 'react';
//import OrderForm from './components/orderForm.js';
import OrderList from './components/orderList.js';
import OrdersService from './modules/orders/orders.service.js';


function OrderPage() { //это компонент
   const [orders, setOrders] = React.useState([]);

   React.useEffect(() => {
     OrdersService.getList()
     .then((data) => {
       setOrders(data)
       console.log (data)
     });
   }, [])

  return (
    <div>
      <OrderList list={orders} />
    </div>
  )
}

class Root extends React.Component {
  render() {
   return (
    <div>
       <OrderPage />
     </div>
   )
  }
}

export default Root;
