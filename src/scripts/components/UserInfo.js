export class UserInfo {
    constructor(profileTitle, profileSubtitle, profileAvatar) {
        this._profileName = profileTitle;   //document.querySelector('.profile__title');
        this._profileJob = profileSubtitle;  //document.querySelector('.profile__subtitle');
        this._profileAvatar =  profileAvatar;   //document.querySelector('.profile__jack');
        this.name = '';
        this.about = '';
        this.avatar = '';
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileJob.textContent,
        }
    }
    getUserAvatar() {
        return {
            avatar: this._profileAvatar.src
        }
    }

    setUserInfo({name, about, avatar}) {
        this.name = name,
        this.about = about;
        this.avatar = avatar
    }

    //Обновляем данные на странице
    updataUserInfo() {
        this._profileName.textContent = this.name;
        this._profileJob.textContent = this.about;
    }
    updataUserAvatar() {
        this._profileAvatar.src = this.avatar
    }
}