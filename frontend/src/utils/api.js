class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Произошла ошибка. Код ошибки: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  editUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    }).then((res) => this._getResponseData(res));
  }

  addNewCard({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: !isLiked ? "PUT" : "DELETE",
      headers: this._headers
    }).then((res) => this._getResponseData(res));
  }

  editProfileAvatar({ avatar }) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    }).then((res) => this._getResponseData(res));
  }
}

const api = new Api({
  url: "https://api.mesto.khaera.nomoredomains.xyz",
  headers: {
    "content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }
});

export default api;
