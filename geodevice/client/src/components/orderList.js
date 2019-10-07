//Получаем исходные данные из базы
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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
      return(receivedOrders)
    })
  }


    render() {
      return (
        <div>
          <BootstrapTable data={data}>
            <TableHeaderColumn isKey dataField='ourid'>
              Учетный номер
            </TableHeaderColumn>
            <TableHeaderColumn dataField='contactname'>
              Имя
            </TableHeaderColumn>
            <TableHeaderColumn dataField='contactphone'>
              Телефон
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }

}

export default OrderList;
