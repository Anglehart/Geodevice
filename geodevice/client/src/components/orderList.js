import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';
import '../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

class OrderList extends React.Component {

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
      const selectRow = {
        mode: 'radio',
        clickToSelect: false,
        onSelect: (row) => {
          console.log(row.id) //работает
          this.props.onSelect(row.id) //не работает this.props.onSelect is not a function
        }
      }

      return (
        <div>
          <BootstrapTable
          keyField='id'
          data={this.props.list}
          columns={columns}
          selectRow={selectRow}
          defaultSorted={defaultSorted}
          pagination={paginationFactory()}
          cellEdit={cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: (oldValue, newValue, row, column) => {this.props.onEdit(newValue, row, column)}
          })}
          />
        </div>
      );
    }
}

export default OrderList;
