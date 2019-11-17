import React from 'react';
import OrderForm from './components/orderForm.js';
import OrderList from './components/orderList.js';
import OrdersService from './modules/orders/orders.service.js';

function OrderPage() {
  const [orders, setOrders] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState();

  React.useEffect(() => {
    OrdersService.getList() //промис
    .then((data) => {
        setOrders(data)
    })
  }, []);
}
  /*const onOrderSelect = (index) => {
    const selectedOrder = orders[index]; //исправить
  }

  const onSave = (newOrder) => {
    fetch (save newOrder)
    then update orders
    OrdersService.update(newOrder)
   }

  const onDelete = () => {
    fetch (delete selectedOrder)
  };

  return (
    <div>
      <OrderForm onAdd={onSave} onDelete={onDelete} />
      <OrderList list={orders} onSelect={onOrderSelect} onEdit={onSave} />
    </div>
  );
 }
 */


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
