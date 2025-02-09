document.getElementById("newUser").addEventListener("click", function (e) { //Добавить пользователя
    e.preventDefault(); //отменяем стандарную реакцию браузера

    let registerForm = document.forms["registerForm"]; //получаем данные формы
    let userName = registerForm.elements["userName"].value; //добавляем элементы из формы
    let userAge = registerForm.elements["userAge"].value; //и второй
    let user = JSON.stringify({userName: userName, userAge: userAge}); //магия?

    fetch('/user', {
      method: 'POST',
      body: user, // data может быть типа `string` или {object}!
      headers:{
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
    .then(function(receivedUser) {
      alert ('Добавлен пользователь с id ' + receivedUser.id)
    })

    .catch(function(error){
      alert (error);
    })
});

document.getElementById("showAll").addEventListener("click", function (e) { //Показать всех пользователей
e.preventDefault(); //отменяем стандарную реакцию браузера
    fetch('/user', {
      method: 'GET',
      headers:{
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
    .then(function(receivedUsers) {
        for (i = 0; i < receivedUsers.length; i++) {
          let newLi = document.createElement('li');
          newLi.innerHTML = receivedUsers[i].id + ' ' + receivedUsers[i].name + ' ' + receivedUsers[i].age;
          list.insertBefore(newLi, list.firstChild);
        }
      })

});

document.getElementById("deleteUser").addEventListener("click", function (e) { //Удалить одного пользователя
    e.preventDefault();

    let registerForm = document.forms["registerForm"];
    let userId = registerForm.elements["userId"].value;
    let url = '/user/id?userId=' + userId;

    fetch(url, {
      method: 'DELETE',
      headers:{
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
    .then(function(receivedUsers) {
      alert('Удален пользователь с ID ' + receivedUsers[0].id)
    })
    .catch(function(error){
      alert ('Нет такого пользователя');
    })
});

document.getElementById("showUser").addEventListener("click", function (e) { //Возвращает одного пользователя
    e.preventDefault();

    let registerForm = document.forms["registerForm"];
    let userId = registerForm.elements["userId"].value;
    let url = '/user/id?userId=' + userId;

    fetch(url, {
      method: 'GET',
      headers:{
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
    .catch(function(error){
      alert (error);
    })
    .then(function(receivedUser) {
      console.log(receivedUser);
      if (receivedUser.length == 0) {
        return alert('Нет пользователя с таким ID');
      } else {
        alert('ID: ' + receivedUser.id + ' Имя: ' + receivedUser.name + ' Возраст: ' + receivedUser.age);
      }
    })
    .catch(function(error){
      alert (error);
    })
});

document.getElementById("editUser").addEventListener("click", function (e) { //Изменить пользователя
    e.preventDefault();

    let registerForm = document.forms["registerForm"];
    let userName = registerForm.elements["userName"].value;
    let userAge = registerForm.elements["userAge"].value;
    let userId = registerForm.elements["userId"].value;
    let user = JSON.stringify({userName: userName, userAge: userAge, userId: userId});

    fetch('/user/id', {
      method: 'PUT',
      body: user, // data может быть типа `string` или {object}!
      headers:{
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
    .then(function(receivedUser) {
      if (receivedUser.id != true) {
        alert ('Нет пользователя с таким ID');
      } else {
        alert ('Обновлен пользователь с ID ' + receivedUser.id + ' Имя ' + receivedUser.name + ' Возраст ' + receivedUser.age)
      }
    })

    .catch(function(error){
      alert (error);
    })
});
