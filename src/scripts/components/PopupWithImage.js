import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor() {
        super(document.querySelector('.popup_img'));
    }

    handleCardClick() {
        this.open();
    }

    open() {
        super.open()
        document.querySelector('.popup__img').alt = this._name;
        document.querySelector('.popup__title').textContent = this._name;
        document.querySelector('.popup__img').src = this._link;
    }

    close() {
        super.close(this._popup)
    }
}