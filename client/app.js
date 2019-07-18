document.getElementById("submit").addEventListener("click", function (e) { //обрабатываем клик на submit
    e.preventDefault(); //отменяем стандарную реакцию браузера

    let registerForm = document.forms["registerForm"]; //получаем данные формы
    let userName = registerForm.elements["userName"].value; //добавляем элементы из формы
    let userAge = registerForm.elements["userAge"].value; //и второй
    let user = JSON.stringify({userName: userName, userAge: userAge}); //магия?

    fetch('/', {
      method: 'POST',
      body: user, // data может быть типа `string` или {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })

    .then(function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

      response.json().then(function(receivedUsers) { //Это мне не понятно... Почему не работает: let receivedUsers = JSON.parse(request.response);
        for (i = 0; i < receivedUsers.length; i++) { //json это массив объектов. Перебираем их все
          let newLi = document.createElement('li'); //создаем новую строку
          newLi.innerHTML = receivedUsers[i].name + ' ' + receivedUsers[i].age; //наполняем строку свойствами объектов
          list.insertBefore(newLi, list.firstChild); //вставляем получившуюся строку первой
        }
      })
  })
});
