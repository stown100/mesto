export class UserInfo {
    constructor(profileTitle, profileSubtitle, profileAvatar) {
        this._profileName = profileTitle;   //document.querySelector('.profile__title');
        this._profileJob = profileSubtitle;  //document.querySelector('.profile__subtitle');
        this._profileAvatar =  profileAvatar;   //document.querySelector('.profile__jack');
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
    setUserInfo(name, about) {
        if(name) {
            this._profileName.textContent = name;
        }
        if(about) {
            this._profileJob.textContent = about;
        }
    }
    serUserAvatar(avatar) {
        if(avatar) {
            this._profileAvatar.src = avatar
        }
    }
}