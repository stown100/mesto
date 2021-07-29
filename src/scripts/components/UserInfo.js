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
            name: this.name,
            about: this.about,
            // avatar: this.avatar
        }
    }
    getUserAvatar() {
        return {
            avatar: this.avatar
        }
    }

    setUserInfo({name, about}) {
        this.name = name,
        this.about = about;
        // this.avatar = avatar
    }
    setUserAvatar(avatar) {
        this.avatar = avatar
    }

    //Обновляем данные на странице
    updataUserInfo() {
        this._profileName.textContent = this.name;
        this._profileJob.textContent = this.about;
        // this._profileAvatar = this.avatar
    }
    updataUserAvatar() {
        this._profileAvatar.src = this.avatar
    }




    
    //БЫЛО
    // getUserInfo() {
    //     const userInfo = {
    //         name: this._profileName.textContent,
    //         role: this._profileJob.textContent,
    //     }
    //     return userInfo
    // }

    // setUserInfo(name, job) {
    //     this._profileName.textContent = name;
    //     this._profileJob.textContent = job;
    // }
}