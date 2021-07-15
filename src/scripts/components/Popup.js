export class Popup {
    constructor(popup) {
        // this._popup = popup;
        this._popup = document.querySelector('.popup');
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
        console.log('закрыл')

    }
    //закрытие кликом на оверлей
    setEventListeners() {
        this._popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                this._popup.classList.remove('popup_opened');
                console.log('клик')
            }
        })
    }
    //Закрытие попапов через ESC
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close(document.querySelector('.popup_opened'));
            console.log('esc')
        }
    }
}