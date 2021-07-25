import { PopupWithForm } from "./PopupWithForm";

export class Avatar extends PopupWithForm{
    constructor(popup, saveAvatar) {
        super(popup);
        this._saveAvatar = saveAvatar;
    }

    setEventListeners() {
        super.setEventListeners(this._popup);
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._saveAvatar();
        });
    }

    close() {
        super.close(this._popup);
        this._popup.querySelector('.form').reset();
    }
}
