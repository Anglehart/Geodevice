document.getElementById("submit").addEventListener("click", function (e) { //обрабатываем клик на submit
    e.preventDefault(); //отменяем стандарную реакцию браузера

    let registerForm = document.forms["registerForm"]; //получаем данные формы
    let userName = registerForm.elements["userName"].value; //добавляем элементы из формы
    let userAge = registerForm.elements["userAge"].value; //и второй
    let user = JSON.stringify({userName: userName, userAge: userAge}); //магия?

    const req = fetch('/user', {
      method: 'POST',
      body: user, // data может быть типа `string` или {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    })

    req.then(function(response) {
      if (response.status !== 200) {
        throw new Error('Статус не 200');
      } else {
        return response.json();
      }
    })

    .then(function(receivedUser) {
      alert ('Добавлен пользователь с id ' + receivedUser[0].id)
    })

    .catch(function(error){
      alert (error);
    })
});
