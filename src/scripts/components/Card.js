export class Card {
    constructor(data, cardSelector, open, popupDeleteCard, hendleCardLike, api) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._open = open;
        this._popupDeleteCard = popupDeleteCard;
        this._cardId = data._id;
        this._owner = data.owner._id;
        this._userId = 'b801fba7bd7ef0fa0591f054'
        this._likes = data.likes;
        this._myId = data.myId;
        this._hendleCardLike = hendleCardLike;
        this._api = api;
    }

    //Добавление карточек из массива
    createCard = () => {
        this._element = this._getTemplate();
        this._removeButtonDelete(this);
        this._setEventListeners();
        this.setLikeCard(this)
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
        this._elementGroup = this._element.querySelector('.element__group')
        this._elementGroup.addEventListener('click', this.hendleCardLike); //обработчик события лайка
        this._element.querySelector('.element__img').addEventListener('click', () => { 
            this._open() }); //обработчик события открытия в большом размере
        this._element.querySelector('.element__delete').addEventListener('click', this.deleteCard); //открытия попапа подтверждения
        this._elementLike = this._element.querySelector('.element__like_number');
    }

    //функция удаления карточки
    deleteCard = () => {
        return this._popupDeleteCard(this)
    }

    removeCard = () => {
        this._element.remove();
    }
    //Скрывает урну с чужой карточки
    _removeButtonDelete() {
        if (this._owner !== this._userId) {
            this._element.querySelector('.element__delete').style.display = 'none';
        }
      }
//Функция лайка
      setLikeCard = ({likes}) => {
          if(likes) {
              this._likes = likes
          }
        this._isLiked = this._likes.filter(() => { return this._owner === this._userId }).length > 0
        this._elementLike.textContent = this._likes.length;
        if (this._isLiked) {
          this._elementGroup.classList.add('element__group_active');
        } else {
          this._elementGroup.classList.remove('element__group_active');
        }
      
      hendleCardLike = () => {
        return this._hendleCardLike(this)
    }

    isLiked() {
        return !!this._likes.find(like => like._id === this._userId)
    }
      
    cardId() {
        return this._cardId
    }
}