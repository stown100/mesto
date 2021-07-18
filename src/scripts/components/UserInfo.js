export class UserInfo {
    constructor(profileTitle, profileSubtitle) {
        this._profileName = profileTitle;
        this._profileJob = profileSubtitle;
    }

    getUserInfo() {
        const userInfo = {
            name: this._profileName.textContent,
            role: this._profileJob.textContent,
        }
        return userInfo
    }

    setUserInfo(name, job) {
        this._profileName.textContent = name;
        this._profileJob.textContent = job;
    }
}