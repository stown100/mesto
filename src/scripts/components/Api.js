import axios from 'axios'

export class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }
    //Добавление карточек с сервера
    getInitialCards() {
        return fetch(`${this.url}/cards`, {
            method: 'GET',
            headers: this.headers,
        })
        .then(this._handleResponse)
        .catch(this._catchError);
    }
    //добавление карточки
    addTask(data) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data)
        })
            .then(this._handleResponse)
            // .catch(this._catchError);
    }

    deleteTask(id) {                                    //ДОДЕЛАТЬ УДАЛЕНИЕ
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
        .then(this._handleResponse)
        // .catch(this._catchError);
    }

    //Редактирование профиля(получаю данные с сервера)
    getUserInfo() {
        return fetch(`${this.url}/users/me`, {
            // method: 'PATCH',
            headers: this.headers,
        })
        .then(this._handleResponse)
        .catch(this._catchError);
    }

    //редактирование профиля(Отправляю данные да серсер)
    setUserInfo({name, about}) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name,
                about
            })
        })
        .then(this._handleResponse)
        .catch(this._catchError);
    }

    //замена аватара
getUserAvatar() {
    // debugger
    return fetch(`${this.url}/users/me/avatar`, {
        // method: 'PATCH',
        headers: this.headers,
    })
        .then(this._handleResponse)
        .catch(this._catchError);
}

    setUserAvatar(avatar) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify(avatar)
        })
        .then(this._handleResponse)
        .catch(this._catchError);
    }


    _handleResponse = (res) => {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _catchError() {
        console.log('Что-то сломалось');
    }

    // другие методы работы с API
}