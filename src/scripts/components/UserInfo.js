import { Popup } from "./Popup.js";

export class UserInfo extends Popup {
    constructor(nameInput, jobInput) {
        super();
        this._popup = document.querySelector('.popup_profile');
        this._nameInput = nameInput;
        this._jobInput = jobInput;
    }

    getUserInfo() {
        super.open(this._popup)
        const userInfo = {
            name: this._nameInput.value = document.querySelector('.profile__title').textContent,
            role: this._jobInput.value = document.querySelector('.profile__subtitle').textContent,
        }
        return userInfo
    }

    setUserInfo() {
        document.querySelector('.profile__title').textContent = this._nameInput.value;
        document.querySelector('.profile__subtitle').textContent = this._jobInput.value;
        super.close(this._popup);
    }

    // close() {
    //     super.close(document.querySelector('.popup_profile'))
    // }
}