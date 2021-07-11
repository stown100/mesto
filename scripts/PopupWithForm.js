import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popup, saveNewCard) {
        super();
        this._popup = popup;
        this._saveNewCard = saveNewCard;
    }

    setEventListenersForm() {
        super.setEventListeners();
        super.open();
        document.querySelector('.popup_images').addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._saveNewCard();
        });
    }

    close() {
        super.close(document.querySelector('.popup_images'));
        document.querySelector('.form_append').reset();
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