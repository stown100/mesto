import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
    }

    open(name, link) {
        super.open();
        this._popup.querySelector('.popup__img').alt = name;
        this._popup.querySelector('.popup__title').textContent = name;
        this._popup.querySelector('.popup__img').src = link;
      }
}