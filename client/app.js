document.getElementById("submit").addEventListener("click", function (e) { //обрабатываем клик на submit
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
      alert ('Добавлен пользователь с id ' + receivedUser)
    })

    .catch(function(error){
      alert (error);
    })
});

document.getElementById("showAll").addEventListener("click", function (e) { //обрабатываем клик на submit
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
