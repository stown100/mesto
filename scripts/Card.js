export class Card {
    constructor(name, link, openPopup) {
        this._name = name;
        this._link = link;
        this._openPopup = openPopup;
    }

    //Добавление карточек из массива
    createCard() {
        this._element = this._getTemplate();
        this._element = this._setEventListeners();
        this._element.querySelector('.element__img').src = this._link;                  //передаю данные
        this._element.querySelector('.element__img').alt = this._name;                  //передаю данные
        this._element.querySelector('.element__title').textContent = this._name;        //передаю данные
        return this._element;                                                     //возвращаю элемент
    }

    _getTemplate() {
        return this._element = document.querySelector('#tmplt').content.querySelector('.element').cloneNode(true); //клонирую элемент
    }

    _setEventListeners() {
        this._element.querySelector('.element__group').addEventListener('click', this._likeCard); //обработчик события лайка
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard); //обработчик события удаления
        this._element.querySelector('.element__img').addEventListener('click', this._openedCard); //обработчик события открытия в большом размере
        return this._element; 
    }

    //функция лайка
    _likeCard = (evt) => {
        evt.target.classList.toggle('element__group_active');
    }

    //функция удаления карточки
    _deleteCard = (evt) => {
        evt.target.closest('.element').remove();
    }

    //Открытие карточки
    _openedCard = () => {
        this._openPopup(document.querySelector('.popup_img'));
        document.querySelector('.popup__img').alt = this._name;
        document.querySelector('.popup__title').textContent = this._name;
        document.querySelector('.popup__img').src = this._link;
    }
}