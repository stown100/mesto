export class UserInfo {
    constructor(profileTitle, profileSubtitle) {
        this._profileName = profileTitle;   //document.querySelector('.profile__title');
        this._profileJob = profileSubtitle;  //document.querySelector('.profile__subtitle');
        this.name = '';
        this.about = '';
    }

    getUserInfo() {
        return {
            name: this.name,
            about: this.about,
        }
    }

    setUserInfo({name, about}) {
        this.name = name,
        this.about = about
    }

    updataUserInfo() {
        this._profileName.textContent = this.name;
        this._profileJob.textContent = this.about;
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
    //Обновляем данные на странице
}