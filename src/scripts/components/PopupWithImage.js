import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup, name, link) {
        super(popup);
        // this._name = document.querySelector('.popup__title');
        // this._link = document.querySelector('.popup__img');
        // console.log(this._link)
    }

    open(name, link) {
        super.open(this._popup);
        document.querySelector('.popup__img').alt = name;
        document.querySelector('.popup__title').textContent = name;
        document.querySelector('.popup__img').src = link;
      }

    close() {
        super.close(this._popup)
    }
}