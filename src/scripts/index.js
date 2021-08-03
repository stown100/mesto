//Не доделал удаление и лайки. Отправляю на всякий случай, чтоб была возможность доделать на каникулах

import '../pages/index.css'
import {
    editAvatarForm, editProfileForm, editNewCardForm, 
    popupAvatar, profileTitle, profileSubtitle,
    configValidation, avatarInput, editDeledeForm,
    editBtn, profilePopup, popupDeleteCard,
    nameInput, jobInput,
    buttonOpenPopupCard, newCardPopup,
    sectionElements, popupImgOpen,
    cardSelector, initialCards, buttonDeleteCard,
    profileAvatar,
} from './utils/constants';
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from './components/Api';    //9
import { PopupWithSubmit } from './components/PopupWithSubmit';

const api = new Api({                   //9
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: '4187936b-f13d-40c6-aac3-45e4140019db',
      'Content-Type': 'application/json'
    }
  });
                                                            //Работа с карточками
  //Добавления карточек с сервера
  api.getInitialCards()
  .then((res) => {
    const sectionClass = new Section({ 
        items: res.reverse(), renderer: addCard }, sectionElements, api);
    sectionClass.renderItems();
    console.log('Пришли карточки')
  })


  //Добавление новой карточки
const addCardPopup = new PopupWithForm(newCardPopup, (inputValues) => {
    addCard( {data: inputValues.title, data: inputValues.link} )
    api.addTask({name: inputValues.title, link: inputValues.link});
    addCardPopup.close(newCardPopup);
    addCardFormValidator.setSubmitButtonState();
});

const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements, api);
const popupWithImageClass = new PopupWithImage(popupImgOpen);

function addCard(data) {
    const card = new Card(data, cardSelector, () => {
        popupWithImageClass.open(data.name, data.link)
    },
    //Открываю попап подтверждения
    () => {
        popupWithSubmitClass.open()
    }, 
    api);
    const cardElement = card.createCard();
    sectionClass.addItem(cardElement);
}                                      //Вывод данных на стр.

                                                        //Удаления карточек
const popupWithSubmitClass = new PopupWithSubmit(popupDeleteCard, deleteCardClick)

const deleteCardClick = (card) => {
    popupWithSubmitClass.open()
    popupWithSubmitClass.setOnSubmit(() => {
    api.deleteTask()
    .then (() => {
        popupWithSubmitClass.setTextButton(true)
      card.deleteCard()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
        popupWithSubmitClass.setTextButton(false)
        popupWithSubmitClass.close()
    })
  })
}



                                                        //Работа с редактированием профиля
const userInfoClass = new UserInfo(profileTitle, profileSubtitle, profileAvatar);
//Сохранение редактирования данных пользователя
const editProfilePopup = new PopupWithForm(profilePopup, ({name, about}) => {
    userInfoClass.setUserInfo({name: name, about: about})
    editProfilePopup.close(profilePopup)//Сохранения попапа редактирования профиля
    //Отправляю данные профиля на сервер
    api.setUserInfo({name, about}).then(({name, about}) => {
        userInfoClass.setUserInfo({name: name, about: about})
        userInfoClass.updataUserInfo();
    })
})

//Прихоодят данные пользователя
api.getUserInfo().then(({name, about, avatar}) => {
    console.log('Пришли данные пользователя')
    userInfoClass.setUserInfo({name: name, about: about})
    userInfoClass.updataUserInfo();
    userInfoClass.setUserInfo({avatar: avatar})
    userInfoClass.updataUserAvatar();
  })
  

                                                //Работа с аватаром
const editAvatarPopup = new PopupWithForm(popupAvatar, (avatar) => {
    userInfoClass.setUserInfo(avatar)
    editAvatarPopup.close(popupAvatar)
    api.setUserAvatar(avatar).then((avatar) => {
        userInfoClass.setUserInfo(avatar)
        userInfoClass.updataUserAvatar();
    })
    // .finally(() => popupAvatar.renderSave(false));
})


//Валидации
const avatarFormValidator = new FormValidator(configValidation, editAvatarForm)
avatarFormValidator.enableValidation();  //Валидация формы редактирования аватара

const profileFormValidator = new FormValidator(configValidation, editProfileForm);
profileFormValidator.enableValidation(); //Валидация формы редактирования профиля

const addCardFormValidator = new FormValidator(configValidation, editNewCardForm);
addCardFormValidator.enableValidation(); //Валидация формы добавления карточки

//События
//Открытие попапа редактирования профиля
editBtn.addEventListener('click', () => {
    const currentUserInfo = userInfoClass.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.about; 
    editProfilePopup.open()
});
//Открытие попапа добавления карточки
buttonOpenPopupCard.addEventListener('click', () => {
     addCardPopup.open(newCardPopup) });
//9 Открытие попапа смены аватара
document.querySelector('.profile__redact-img').addEventListener('click', () => {
    const currentUserAvatar = userInfoClass.getUserAvatar();
    avatarInput.value = currentUserAvatar.avatar;
    editAvatarPopup.open(popupAvatar);
});
// buttonDeleteCard.addEventListener('click', () => {
//     popupWithSubmitClass.open(popupDeleteCard);     //Открывает попап подтверждения
// })
addCardPopup.setEventListeners(newCardPopup);
popupWithImageClass.setEventListeners(popupImgOpen);
editProfilePopup.setEventListeners(profilePopup);
editAvatarPopup.setEventListeners(popupAvatar);   //9
popupWithSubmitClass.setEventListeners(popupDeleteCard) //9