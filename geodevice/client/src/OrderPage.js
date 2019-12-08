import React from 'react';
import OrderForm from './components/orderForm.js';
import OrderList from './components/orderList.js';
import OrdersService from './modules/orders/orders.service.js';


function OrderPage() {
  const [orders, setOrders] = React.useState([]);
  const [selectedOrder, setSelectedOrder] = React.useState();

  React.useEffect(() => {
    OrdersService.getList()
    .then((data) => {
     setOrders(data)
   });
  }, [])

  function createOneOrder(newOrder) {
    let data = JSON.stringify(newOrder);
    console.log(data)
    fetch('http://localhost:3001/orders', {
      method: 'POST',
      body: data,
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.json()
      }
    })
    .catch(function(error){
      alert ('Ошибка сервера ' + error);
    })
    .then(function(newOrder) {
      alert('Добавлен заказ №'+ newOrder.ourid )
    })
    .catch(function(error){
      alert ('Нет такого заказа');
    })
    
    OrdersService.getList()
    .then((data) => {
     setOrders(data)
    });
  }

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
    setSelectedOrder(rowIndex)
  }

  function deleteOneOrder(){
    if (window.confirm("Удалить заказ?")) {
      let url = 'http://localhost:3001/orders/id?orderId=' + selectedOrder;
      fetch(url, {
        method: 'DELETE',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        if (response.status !== 200) {
          throw new Error('Статус не 200');
        } else {
          return response.json();
        }
      })
      .then(function(receivedOrders) {
        alert('Удален заказ №'+ receivedOrders[0].ourid )
      })
      .catch(function(error){
        alert ('Нет такого заказа');
      })

      OrdersService.getList()
      .then((data) => {
       setOrders(data)
      });
    }
  }


  return (
    <div>
      <OrderForm onDelete={deleteOneOrder} onCreate={createOneOrder}/>
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
