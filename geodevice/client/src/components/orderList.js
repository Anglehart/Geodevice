//Получаем исходные данные из базы
import React from 'react';
class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.getAllOrders = this.getAllOrders.bind(this)
  }

  getAllOrders() {
    fetch ('http://localhost:3001/orders', {
      method: 'GET',
      headers: {
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
      alert(receivedOrders[1].ourid)
    })
  }

  render () {
    return (
      <ul>
        {this.getAllOrders()}
      </ul>
    )
  }

}

export default OrderList;
