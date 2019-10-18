//Получаем исходные данные из базы
import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.getAllOrders = this.getAllOrders.bind(this)
    this.state = {
      data: [],
      changedRow: "",
      changedColumn: ""
    }
    this.getAllOrders();
  }

  async changeOneOrder(row, column) {
    await this.setState ({
      changedRow: row.id,
      changedColumn: column.dataField
    })
    await console.log (this.state.changedColumn)
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
      const columns = [
        {dataField: 'ourid', text: 'Наш ID', sort: true},
        {dataField: 'contactname', text: 'Имя заказчика', sort: true},
        {dataField: 'contactphone', text: 'Телефон', sort: true},
        {dataField: 'companyname', text: 'Компания', sort: true},
        {dataField: 'devicename', text: 'Прибор', sort: true},
        {dataField: 'devicesn', text: 'Серийный номер', sort: true},
        {dataField: 'mastername', text: 'Мастер', sort: true}
      ];
      const defaultSorted = [{dataField: 'ourid', order: 'desc'}];
      return (
        <div>
          <BootstrapTable
          keyField='id'
          data={this.state.data}
          columns={columns}
          defaultSorted={defaultSorted}
          pagination={paginationFactory()}
          cellEdit={cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: (oldValue, newValue, row, column) => {this.changeOneOrder(row, column)}
          })}
          />
        </div>
      );
    }

}

export default OrderList;
