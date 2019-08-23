import React from 'react';
class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ourId: '',
      contactName: ''
    };
    //Эти строки не понятны
    this.handleOurIdChange = this.handleOurIdChange.bind(this)
    this.handleContactNameChange = this.handleContactNameChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleOurIdChange(e) {
     this.setState({ourId: e.target.value});
  }

  handleContactNameChange(e) {
     this.setState({contactName: e.target.value});
  }

    render() {
      return (
        <form name="addOrderForm">
          <div className="addOrder">
            <input type="number" placeholder="Учетный номер" name="ourId" value={this.state.ourId} onChange={this.handleOurIdChange} />
          </div>
          <div className="addOrder">
            <input type="text" placeholder="Контактное лицо" name="contactName" value={this.state.contactName} onChange={this.handleContactNameChange} />
          </div>
          <div className="addOrder">
            <label>Контактный телефон</label><br />
            <input type="number" name="contactPhone" />
          </div>
          <div className="addOrder">
            <label>Компания</label><br />
            <input type="text" name="companyName" />
          </div>
          <div className="addOrder">
            <label>Прибор</label><br />
            <input type="text" name="deviceName" />
          </div>
          <div className="addOrder">
            <label>Серийный номер</label><br />
            <input type="text" name="deviceSn" />
          </div>
          <div className="addOrder">
            <label>Мастер</label><br />
            <input type="text" name="masterName" />
          </div>
          <div className="addOrder">
            <button type="submit" id="newOrder" onClick={this.handleCreate}>Добавить заказ</button><br />
            <button type="submit" id="changeOrder">Изменить заказ</button><br />
          </div>
        </form>
    )
  }

  handleCreate() {
    let data = JSON.stringify(this.state);
    console.log(data);
    fetch('http://127.0.0.1:3001/orders', {
      method: 'POST',
      body: data,
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (response.status !== 200) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .catch(function(error){
      alert ('Ошибка ' + error);
    })

    .then(function(receivedOrder) {
      console.log(receivedOrder.ourid);
      alert ('Добавлен заказ с id ' + receivedOrder.ourid)
    })
    .catch(function(error){
      alert (error);
    })
      //alert("Наш ID: " + this.state.ourId);
      //alert("Контакное лицо: " + this.state.contactName);
  }
}


export default OrderForm;
