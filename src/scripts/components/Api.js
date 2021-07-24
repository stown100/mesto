export class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }

    getInitialCards() {
        return fetch(this.url, {
            method: 'GET',
            headers: {
                authorization: '4187936b-f13d-40c6-aac3-45e4140019db' //поменял
            }
        })
        .then(this._handleResponse)
    }

    addTask(data) {
        debugger
        return fetch(this.url, {
            method: 'POST',
            headers: {
                authorization: '4187936b-f13d-40c6-aac3-45e4140019db'
            },
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
    }

    deleteTask(id) {
        debugger
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',

            headers: {
                authorization: '4187936b-f13d-40c6-aac3-45e4140019db' //поменял
            }
        })
        .then(this._handleResponse)
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    // userInfoRequest() {
    //     fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {  //поменять id когорты
    //         method: 'PATCH',
    //         headers: {
    //             authorization: '4187936b-f13d-40c6-aac3-45e4140019db',  //поменял
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             name: 'Marie Skłodowska Curie',
    //             about: 'Physicist and Chemist'
    //         })
    //     });
    // }

    // другие методы работы с API
}