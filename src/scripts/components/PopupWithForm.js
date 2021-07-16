import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popup, saveNewCard) {
        super(popup);
        this._popup = document.querySelector('.popup_images');
        this._saveNewCard = saveNewCard;
    }

    setEventListenersForm() {
        super.setEventListeners();
        super.open(this._popup);
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._saveNewCard();
        });
    }

    close() {
        super.close(this._popup);
        this._popup.querySelector('.form_append').reset();
    }
}

    // _getInputValues() {
    //     // document.querySelector('.form__input_type_title').value = document.querySelector('.form__input_type_title').textContent;
    //     // document.querySelector('.form__input_type_link').value = document.querySelector('.form__input_type_link').textContent;
    // }
                            //Не могу понять, как применить этот метод
    // _getInputValues() {
    //     this._inputSelectors = document.querySelector('.form').querySelectorAll('.form__input');
    //     this._inputObj = {}
    //     this._inputSelectors.forEach((input) => {
    //         this._inputObj.value = input.textContent
    //     })
    //     return this._inputObj
    // }