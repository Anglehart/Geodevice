import React from 'react';
class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ourId: '',
      contactName: '',
      contactPhone: '',
      companyName: '',
      deviceName: '',
      deviceSn: '',
      masterName: ''
    };
    //Эти строки не понятны
    this.handleOurIdChange = this.handleOurIdChange.bind(this)
    this.handleContactNameChange = this.handleContactNameChange.bind(this)
    this.handleContactPhoneChange = this.handleContactPhoneChange.bind(this)
    this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this)
    this.handleDeviceNameChange = this.handleDeviceNameChange.bind(this)
    this.handleDeviceSnChange = this.handleDeviceSnChange.bind(this)
    this.handleMasterNameChange = this.handleMasterNameChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleOurIdChange(e) {
    this.setState({ourId: e.target.value});
  }
  handleContactNameChange(e) {
    this.setState({contactName: e.target.value});
  }
  handleContactPhoneChange(e) {
    this.setState({contactPhone: e.target.value});
  }
  handleCompanyNameChange(e) {
    this.setState({companyName: e.target.value});
  }
  handleDeviceNameChange(e) {
    this.setState({deviceName: e.target.value});
  }
  handleDeviceSnChange(e) {
    this.setState({deviceSn: e.target.value});
  }
  handleMasterNameChange(e) {
    this.setState({masterName: e.target.value});
  }

    render() {
      return (
        <div name="addOrderForm" id="grid">
        <div className="formFields">
          <div className="addOrder">
            <input type="number" placeholder="Учетный номер" name="ourId" value={this.state.ourId} onChange={this.handleOurIdChange} />
          </div>
          <div className="addOrder">
            <input type="text" placeholder="Контактное лицо" name="contactName" value={this.state.contactName} onChange={this.handleContactNameChange} />
          </div>
          <div className="addOrder">
            <input type="text" placeholder="Контактный телефон" name="contactPhone" value={this.state.contactPhone} onChange={this.handleContactPhoneChange} />
          </div>
          <div className="addOrder">
            <input type="text" placeholder="Компания" name="companyName" value={this.state.companyName} onChange={this.handleCompanyNameChange}/>
          </div>
          <div className="addOrder">
            <input type="text" placeholder="Прибор" name="deviceName" value={this.state.deviceName} onChange={this.handleDeviceNameChange}/>
          </div>
          <div className="addOrder">
            <input type="text" placeholder="Серийный номер" name="deviceSn" value={this.state.deviceSn} onChange={this.handleDeviceSnChange}/>
          </div>
          <div className="addOrder">
            <input type="text" placeholder="Мастер" name="masterName" value={this.state.masterName} onChange={this.handleMasterNameChange}/>
          </div>
          </div>
          <div className="addOrderButtons">
            <button id="newOrder" onClick={this.handleCreate}>Добавить заказ</button><br />
            <button id="changeOrder">Изменить заказ</button><br />
          </div>
        </div>
    )
  }

  handleCreate() {
    let data = JSON.stringify(this.state);
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
        return response.json();
      }
    })
    .catch(function(error){
      alert ('Ошибка сервера ' + error);
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
