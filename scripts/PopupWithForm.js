import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
    constructor(popup, saveNewCard) {
        super(open, close);
        this._popup = popup;
        this._saveNewCard = saveNewCard;
    }
    // _getInputValues() {
    //     // document.querySelector('.form__input_type_title').value = document.querySelector('.form__input_type_title').textContent;
    //     // document.querySelector('.form__input_type_link').value = document.querySelector('.form__input_type_link').textContent;
    // }
    // _getInputValues() {
    //     this._inputSelectors = document.querySelector('.form').querySelectorAll('.form__input');
    //     this._inputObj = {}
    //     this._inputSelectors.forEach((input) => {
    //         this._inputObj.value = input.textContent
    //     })
    //     return this._inputObj
    // }
    _getInputValues() {
        this._inputObj = {};
        document.querySelector('.form').querySelectorAll('.form__input').forEach((input) =>
            (this._inputObj[input.name] = input.value)
        );
        return this._inputObj;
      }
    setEventListenersForm() {                                                           //При втором сохранении добавляет 2 пустые карточки
        super.setEventListeners(document.querySelector('.popup_images'));
        document.querySelector('.popup_images').addEventListener('submit', (evt) => {
            evt.preventDefault();
            // debugger
            this._saveNewCard(this._getInputValues());
            document.querySelector('.form_append').reset();
        });
        this.close(document.querySelector('.popup_images'))
    }
}