export class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    //Функция открытия попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    //Функция закрытия попапа
    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
    //закрытие кликом на оверлей
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this.close();
            }
        })
    }
    //Закрытие попапов через ESC
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
}