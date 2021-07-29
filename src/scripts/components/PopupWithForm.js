import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popup, saveNewCard) {
        super(popup);
        this._saveNewCard = saveNewCard;
        this._buttonSubmit = document.querySelector('.form').querySelector('.form__button');
        this._buttonSubmitDefaultText = this._buttonSubmit.textContent;
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
        this._popup.querySelector('.form').reset();
    }

    _getInputValues() {
        this._inputList = this._popup.querySelectorAll('.form__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    // renderSave(isSaving) {
    //     debugger
    //     if (isSaving) {
    //       this._buttonSubmit.textContent = 'Сохранение...';
    //     } else {
    //       this._buttonSubmit.textContent = this._buttonSubmitDefaultText;
    //     }
    //   }
}