export class Card {
    constructor(name, link, cardSelector, open, api) {
        this._name = name;
        this._link = link;
        this._cardSelector = cardSelector;
        this._open = open;
        this._api = api;
    }

    //Добавление карточек из массива
    createCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__img').src = this._link;                  //передаю данные
        this._element.querySelector('.element__img').alt = this._name;                  //передаю данные
        this._element.querySelector('.element__title').textContent = this._name;        //передаю данные
        return this._element;                                                     //возвращаю элемент
    }

    _getTemplate() {
        // if (owner === true) {
        //     document.querySelector(".element__delete").style.visibility = "visible";
        //   } else {
        //     document.querySelector(".element__delete").style.visibility = "hidden";
        //   }
        const element = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return element;
        //Сделать проверку, создал карточку я или нет, чтоб установить корзину
    }

    _setEventListeners() {
        this._element.querySelector('.element__group').addEventListener('click', this._likeCard); //обработчик события лайка
        // document.querySelector('.form__button-delete').addEventListener('click', this._deleteCard); //обработчик события удаления
        this._element.querySelector('.element__img').addEventListener('click', () => { 
            this._open() }); //обработчик события открытия в большом размере
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard);
    }

    //функция лайка
    _likeCard = (evt) => {
        evt.target.classList.toggle('element__group_active');
    }

    //функция удаления карточки
    _deleteCard = (id) => {                                         //ДОДЕЛАТЬ УДАЛЕНИЕ
        this._api.deleteTask(id).then(() => {
            this._element.remove();
        })
        .catch(() => {console.log('Что-то сломалось')});
    }

    // _deleteCard = (evt) => {                             //Рабочая
    //     evt.target.closest('.element').remove();
    // }
}