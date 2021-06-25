// class Card {
//     constructor(name, link, template) {
//         this.name = name;
//         this.link = link;
//         this.template = template;
//     }

//     //Добавление карточек из массива
//     createCard(name, link) {
//         const element = template.querySelector('.element').cloneNode(true); //клонирую элемент
//         element.querySelector('.element__img').src = link;                  //передаю данные
//         element.querySelector('.element__img').alt = name;                  //передаю данные
//         element.querySelector('.element__title').textContent = name;        //передаю данные
//         element.querySelector('.element__group').addEventListener('click', likeCard); //обработчик события лайка
//         element.querySelector('.element__delete').addEventListener('click', deleteCard); //обработчик события удаления
//         element.querySelector('.element__img').addEventListener('click', openedCard); //обработчик события открытия в большом размере
//         return element;                                                     //возвращаю элемент
//     }

//     //Вызов функции createCard для добавления карточек из массива
//     initialCardsF() {
//         initialCards.forEach((data) => {                         //Перебираю массив методом forEach
//             sectionElements.append(createCard(data.name, data.link));  //Добавляю карточки в начало списка с помощью вызова createCard
//         });
//     }

//     //функция удаления карточки
//     _deleteCard(evt) {
//         evt.target.closest('.element').remove();
//     }

//     //функция лайка
//     _likeCard(evt) {
//         evt.target.classList.toggle('element__group_active');
//     }
// }
// export { Card }