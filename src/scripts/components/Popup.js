export class Popup {
    constructor(popup) {
        this._popup = popup;
    }
    //Функция открытия попапа
    open(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }
    //Функция закрытия попапа
    close(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        console.log('закрыл')

    }
    //закрытие кликом на оверлей
    setEventListeners(popup) {
        popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {
                popup.classList.remove('popup_opened');
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