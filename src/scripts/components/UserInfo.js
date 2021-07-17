export class UserInfo {
    constructor(profileTitle, profileSubtitle) {
        this._nameInput = profileTitle;
        this._jobInput = profileSubtitle;
    }

    getUserInfo() {
        const userInfo = {
            name: document.querySelector('.form__input_type_name').value = this._nameInput.textContent,
            role: document.querySelector('.form__input_type_role').value = this._jobInput.textContent,
        }
        return userInfo
    }

    setUserInfo() {
        this._nameInput.textContent = document.querySelector('.form__input_type_name').value;
        this._jobInput.textContent = document.querySelector('.form__input_type_role').value;
    }
}