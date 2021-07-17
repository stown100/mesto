import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup, name, link) {
        super(popup);
        this._name = name;
        // this._link = document.querySelector('.element__img');
        this._link = document.querySelector('.popup__img').src;
    }

    handleCardClick() {
        super.open(this._popup);
        // debugger
        this._name = document.querySelector('.popup__img').alt;
        document.querySelector('.popup__title').textContent = this._name;
        this._link = link;
        console.log(this._link)
      } 

    //   open() {
    //     this.handleCardClick();
    //   }

    close() {
        super.close(this._popup)
    }
}