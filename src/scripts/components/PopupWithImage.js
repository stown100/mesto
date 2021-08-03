import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._popupCardImage = this._popup.querySelector('.popup__img');
        this._captionImage = this._popup.querySelector('.popup__title');
    }

    open(name, link) {
        super.open();
        this._popupCardImage.alt = name;
        this._captionImage.textContent = name;
        this._popupCardImage.src = link;
      }
}