import React from 'react';
import OrderForm from './components/orderForm.js';
import OrderList from './components/orderList.js';
import OrdersService from './modules/orders/orders.service.js';


function OrderPage() { //это компонент
  const [orders, setOrders] = React.useState([]);
  //const [selectedIndex, setSelectedIndex] = React.useState();

  React.useEffect(() => {
    OrdersService.getList()
    .then((data) => {
     setOrders(data)
   });
  }, [])

  function changeOneOrder(newValue, changedRow, changedColumn) {
    let changeData = JSON.stringify ({id: changedRow.id, changedrow: changedColumn.dataField, newvalue: newValue});
   fetch('http://localhost:3001/orders/id', {
     method: 'PUT',
     body: changeData,
     headers:{
       'Content-Type': 'application/json'
     }
   })
 }

 function selectOneOrder(rowIndex){
   console.log(rowIndex)
 }

  return (
    <div>
      <OrderForm />
      <OrderList list={orders} onEdit={changeOneOrder} onSelect={selectOneOrder} />
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
