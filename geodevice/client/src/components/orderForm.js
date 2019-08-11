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
    fetch('/user', {
      method: 'POST',
      body: 'this.state.ourId', // data может быть типа `string` или {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(function(response) {
      if (response.status !== 200) {
        throw new Error('Статус не 200');
      } else {
        console.log(response.json());
        return response.json();
      }
    })
    .then(function(receivedUser) {
      alert ('Добавлен пользователь с id ' + receivedUser.id)
    })

    .catch(function(error){
      alert (error);
    })
      //alert("Наш ID: " + this.state.ourId);
      //alert("Контакное лицо: " + this.state.contactName);
  }
}


export default OrderForm;
