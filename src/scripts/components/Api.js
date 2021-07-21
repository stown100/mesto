export class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-26/cards', {
            headers: {
                authorization: '4187936b-f13d-40c6-aac3-45e4140019db' //поменял
            }
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                // если ошибка, отклоняем промис
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    userInfoRequest() {
        fetch('https://mesto.nomoreparties.co/v1/cohortId/users/me', {  //поменять id когорты
            method: 'PATCH',
            headers: {
                authorization: '4187936b-f13d-40c6-aac3-45e4140019db',  //поменял
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Marie Skłodowska Curie',
                about: 'Physicist and Chemist'
            })
        });
    }

    // другие методы работы с API
}




// export default class Api {
//     constructor({ baseUrl, headers }) {
//       this.baseUrl = baseUrl;
//       this.headers = headers;
//     }

//     get(url) {
//       return fetch(`${this.baseUrl}/${url}`, { headers: this.headers })
//         .then(this._checkResult)
//         .catch(this._showError);
//     }

//     sendUserInfoRequest(jsonBody, link) {
//       return fetch(`${this.baseUrl}/users/me${link}`, {
//         method: "PATCH",
//         headers: this.headers,
//         body: JSON.stringify(jsonBody),
//       })
//         .then(this._checkResult)
//         .catch(this._showError);
//     }

//     postCard(nameValue, linkValue) {
//       return fetch(`${this.baseUrl}/cards`, {
//         method: "POST",
//         headers: this.headers,
//         body: JSON.stringify({
//           name: nameValue,
//           link: linkValue,
//         }),
//       })
//         .then(this._checkResult)
//         .catch(this._showError);
//     }

//     handleCardRequest(cardLink, method) {
//       return fetch(`${this.baseUrl}/cards/${cardLink}`, {
//         method: method,
//         headers: this.headers,
//       })
//         .then(this._checkResult)
//         .catch(this._showError);
//     }

//     _checkResult = (res) => {
//       if (res.ok) {
//         return res.json();
//       }

//       return Promise.reject(`Ошибка: ${res.status}`);
//     };

//     _showError = (err) => {
//       console.log(err);
//       return Promise.reject(err);
//     };
//   }