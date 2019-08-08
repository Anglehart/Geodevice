import React from 'react';
import logo from './logo.svg';

class RegisterForm extends React.Component {

    render() {
      return (
        <form name="registerForm">
            <label>Имя</label><br>
            <input type="text" name="userName" /><br><br>
            <label>Возраст</label></br>
            <input type="number" name="userAge" /><br><br>
            <label>ID</label></br>
            <input type="number" name="userId" /><br><br>
            <button type="submit" id="newUser">Добавить пользователя</button><br>
            <button type="submit" id="showAll">Показать всех пользователей</button><br>
            <button type="submit" id="deleteUser">Удалить пользователя по ID</button><br>
            <button type="submit" id="showUser">Показать пользователя по ID</button><br>
            <button type="submit" id="editUser">Изменить пользователя по ID</button>
        </form>
    )
  }
}

export default RegisterForm;
