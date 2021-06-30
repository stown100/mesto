export class Card {
    constructor(name, link, template, openPopup, popupImgOpen) {
        this._name = name;
        this._link = link;
        this._template = template;
        this._openPopup = openPopup;
        this._popupImgOpen = popupImgOpen
    }

    //Добавление карточек из массива
    createCard() {
        this._element = this._template.querySelector('.element').cloneNode(true); //клонирую элемент
        this._element.querySelector('.element__img').src = this._link;                  //передаю данные
        this._element.querySelector('.element__img').alt = this._name;                  //передаю данные
        this._element.querySelector('.element__title').textContent = this._name;        //передаю данные
        this._element.querySelector('.element__group').addEventListener('click', this._likeCard); //обработчик события лайка
        this._element.querySelector('.element__delete').addEventListener('click', this._deleteCard); //обработчик события удаления
        this._element.querySelector('.element__img').addEventListener('click', this._openedCard); //обработчик события открытия в большом размере
        return this._element;                                                     //возвращаю элемент
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
    _openedCard = (evt) => {
        this._target = evt.target;
        this._openPopup(this._popupImgOpen);
        document.querySelector('.popup__img').src = this._target.src;
        document.querySelector('.popup__img').alt = this._target.alt;
        document.querySelector('.popup__title').textContent = this._target.parentElement.querySelector('.element__title').textContent;
    }
}