//Получаем исходные данные из базы
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

const data = [
  {ourid: 1, contactname: 'Gob', contactphone: '2'},
  {ourid: 2, contactname: 'Buster', contactphone: '5'},
  {ourid: 3, contactname: 'George Michael', contactphone: '4'}
];


class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.getAllOrders = this.getAllOrders.bind(this)
    this.state = {
      data: []
    }
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
      this.setState ({
        data: receivedOrders
      })
    })
  }

    render() {
      const columns = [{
          dataField: 'ourid',
          text: 'Наш ID'
        }, {
          dataField: 'contactname',
          text: 'Имя заказчика'
        }, {
          dataField: 'contactphone',
          text: 'Телефон'
      }];
      console.log(this.state.data)

      return (
        <div>
          <BootstrapTable keyField='ourid' data={data} columns={ columns } />
        </div>
      );
    }

}

export default OrderList;
