export class Popup {
    constructor(popup) {
        this._popup = popup;
    }
    //Функция открытия попапа
    open(popup) {
        popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }
    //Функция закрытия попапа
    close(popup) {
        popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
        // deleteErrorClass();
    }
    //Закрытие попапов через ESC
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this._popupOpened = document.querySelector('.popup_opened');   //НЕ ЗАКРЫВАЕТСЯ НА ESC
            this.close(this._popupOpened);
        }
        // console.log('esc')
    }
    // function handleEscClose(evt) {
//     if (evt.key === 'Escape') {
//         const popupOpened = document.querySelector('.popup_opened');
//         closePopup(popupOpened);
//     }
// }
    // closePopupIsOverlay(evt) {
    //     if (evt.target === evt.currentTarget) {
    //         close(evt.target)
    //     }
    // }

    setEventListeners(popup) {
        popup.addEventListener('click', (evt) => {
            if (evt.target === evt.currentTarget) {                           //НЕ ЗАКРЫВАЕТСЯ НА ОВЕРЛЕЙ
                this.close(evt.target)
            }
        })
        // document.addEventListener('click', this.closePopupIsOverlay);
    }
}
// _setEventListeners() {
//     this._popup.addEventListener('click', (evt) => {
//       if (evt.target.matches('.button_close') || evt.target.matches('.popup')) {
//         this.close();
//       }
//     });
//     document.addEventListener('keyup', this._escCloseHandler);
//   }