import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popup) {
        super();
        this._popup = document.querySelector('.popup_img')
    }

    handleCardClick() {
        super.open(this._popup);
        document.querySelector('.popup__img').alt = this._name;
        document.querySelector('.popup__title').textContent = this._name;
        document.querySelector('.popup__img').src = this._link;
        console.log(this._name)
      } 

    //   open() {
    //     this.handleCardClick();
    //   }
    // handleCardClick() {
    //     this.openCard();
    // }

    close() {
        super.close(this._popup)
    }
}