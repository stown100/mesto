export class Card {
    constructor(data, cardSelector, open, popupDeleteCard, api) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._open = open;
        this._popupDeleteCard = popupDeleteCard;
        this._id = data._id;
        this._owner = data.owner._id;
        this._userId = 'b801fba7bd7ef0fa0591f054'
        this._likes = data.likes
        this._api = api;
        console.log(data.owner)
    }

    //Добавление карточек из массива
    createCard = () => {
        this._element = this._getTemplate();
        this._removeButtonDelete();
        this._setEventListeners();
        this._element.querySelector('.element__img').src = this._link;                  //передаю данные
        this._element.querySelector('.element__img').alt = this._name;                  //передаю данные
        this._element.querySelector('.element__title').textContent = this._name;        //передаю данные
        return this._element;                                                     //возвращаю элемент
    }

    _getTemplate() {
        this._element = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__group').addEventListener('click', this._likeCard); //обработчик события лайка
        // document.querySelector('.form__button-delete').addEventListener('click', this._deleteCard); //обработчик события удаления
        this._element.querySelector('.element__img').addEventListener('click', () => { 
            this._open() }); //обработчик события открытия в большом размере
        this._element.querySelector('.element__delete').addEventListener('click', this.deleteCard);
    }

    //функция лайка
    _likeCard = (evt) => {
        evt.target.classList.toggle('element__group_active');
    }

    //функция удаления карточки
    // _deleteCard = (id) => {                                         //ДОДЕЛАТЬ УДАЛЕНИЕ
    //     this._api.deleteTask(id).then(() => {
    //         this._element.remove();
    //     })
    //     .catch(() => {console.log('Что-то сломалось')});
    // }

    deleteCard = (evt) => {                             //Рабочая
        // evt.target.closest('.element').remove();
        this._popupDeleteCard()
    }

    id() {
        return this._id
      }
    //Скрывает урну с чужой карточки
    _removeButtonDelete() {
        if (this._owner !== this._userId) {
            this._element.querySelector('.element__delete').style.display = 'none';
        }
      }
}