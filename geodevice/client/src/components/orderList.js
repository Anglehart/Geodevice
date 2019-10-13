//Получаем исходные данные из базы
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.getAllOrders = this.getAllOrders.bind(this)
    this.state = {
      data: []
    }
  }

  async getAllOrders() {
    const response = await fetch ('http://localhost:3001/orders', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    this.setState ({
      data: data
    })
  }

    render() {
      this.getAllOrders()
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

      return (
        <div>
          <BootstrapTable keyField='ourid' data={this.state.data} columns={ columns } />
        </div>
      );
    }

}

export default OrderList;
