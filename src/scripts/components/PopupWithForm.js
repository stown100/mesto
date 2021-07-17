import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popup, saveNewCard) {
        super(popup);
        this._saveNewCard = saveNewCard;
    }

    setEventListeners() {
        super.setEventListeners(this._popup);
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._saveNewCard(this._getInputValues());
        });
    }

    close() {
        super.close(this._popup);
        this._popup.querySelector('.form_append').reset();
    }

    _getInputValues() {
        this._inputList = document.querySelector('.form').querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }
}