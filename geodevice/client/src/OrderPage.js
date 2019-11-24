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

   function changeOneOrder(newValue, changedRow, changedColumn) {
     let changeData = JSON.stringify ({id: changedRow.id, changedrow: changedColumn.dataField, newvalue: newValue});
     console.log(changeData)

     fetch('http://localhost:3001/orders/id', {
       method: 'PUT',
       body: changeData,
       headers:{
         'Content-Type': 'application/json'
       }
     })
   }

  return (
    <div>
      <OrderList list={orders} onEdit={changeOneOrder} />
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
