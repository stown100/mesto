import '../pages/index.css'
import {
    editAvatarForm, editProfileForm, editNewCardForm, 
    popupAvatar, profileTitle, profileSubtitle,
    configValidation, avatarInput,
    editBtn, profilePopup, popupDeleteCard,
    nameInput, jobInput,
    buttonOpenPopupCard, newCardPopup,
    sectionElements, popupImgOpen,
    cardSelector, initialCards,
    profileAvatar,
} from '../scripts/utils/constants';
import { FormValidator } from "../scripts/components/FormValidator.js";
import { Card } from "../scripts/components/Card.js";
import { Section } from "../scripts/components/Section.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Api } from '../scripts/components/Api';
import { PopupWithSubmit } from '../scripts/components/PopupWithSubmit';

const api = new Api({                   //9
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: '4187936b-f13d-40c6-aac3-45e4140019db',
      'Content-Type': 'application/json'
    }
  });
                                                            //Работа с карточками

//Получение информации о пользователе и карточки с сервера
let myId = null;
Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userInfoClass, cardInfo]) => {
      myId = userInfoClass._id;
      profileTitle.textContent = userInfoClass.name
      profileSubtitle.textContent = userInfoClass.about
      profileAvatar.src = userInfoClass.avatar

      cardInfo.forEach((item) => {               
        addCard(item) 
      })
    })


  //Добавление новой карточки
const addCardPopup = new PopupWithForm(newCardPopup, (inputValues) => {
    api.addTask({name: inputValues.title, link: inputValues.link}).then((data) => {
        addCardPopup.setButtonText(true)
        addCard(data)
        addCardPopup.close(newCardPopup);//закрытие попап
    })
    .catch(() => {
        console.log('Что-то сломалось!')
      })
    .finally(() => {
        addCardPopup.setButtonText(false)
      })
});
const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements);
const popupWithImageClass = new PopupWithImage(popupImgOpen);

function addCard(data) {
    const card = new Card(data, cardSelector, () => {
        popupWithImageClass.open(data.name, data.link)
    },
    //Открываю попап подтверждения
    deleteCard, hendleCardLike, myId);
    const cardElement = card.createCard();
    creationCard(cardElement)
}                                      //Вывод данных на стр.
function creationCard(cardElement) {
    sectionClass.addItem(cardElement)
}


                                      //Лайки
function hendleCardLike(card) {
      api.likeCard(card.cardId(), card.isLiked())
      .then((data) => {
        card.setLikeCard(data)
      })
      .catch(() => {
        console.log('Что-то сломалось!')
    })
}

                                                        //Удаление карточек
const popupWithSubmitClass = new PopupWithSubmit(popupDeleteCard, deleteCard)
popupWithSubmitClass.setEventListeners();

function deleteCard(card) {
    popupWithSubmitClass.open()
    popupWithSubmitClass.setFormSubmit(() => {
        api.deleteTask(card._cardId)
            .then (() => {
            popupWithSubmitClass.setButtonText(true)
            card.removeCard()
            popupWithSubmitClass.close(popupDeleteCard)
            })
            .catch(() => {
                console.log('Что-то сломалось!')
            })
            .finally(() => {
                popupWithSubmitClass.setButtonText(false)
        })
    })
}


                                                        //Работа с редактированием профиля
const userInfoClass = new UserInfo(profileTitle, profileSubtitle, profileAvatar);
//Сохранение редактирования данных пользователя
const editProfilePopup = new PopupWithForm(profilePopup, ({name, about}) => {
    //Отправляю данные профиля на сервер
    api.setUserInfo({name, about})
    .then((data) => {
        editProfilePopup.setButtonText(true)
        userInfoClass.setUserInfo(data.name, data.about)
        editProfilePopup.close(profilePopup)//Сохранения попапа редактирования профиля
        })
        .catch(() => {
            console.log('Что-то сломалось!')
          })
        .finally(() => {
            editProfilePopup.setButtonText(false)
    })
})
                                                //Работа с аватаром
const editAvatarPopup = new PopupWithForm(popupAvatar, (avatar) => {
    api.setUserAvatar(avatar)
    .then((data) => {
        editAvatarPopup.setButtonText(true)
        userInfoClass.serUserAvatar(data.avatar)
        editAvatarPopup.close(popupAvatar) //закрытие попапа аватара профиля
    })
    .catch(() => {
        console.log('Что-то сломалось!')
      })
    .finally(() => { 
        editAvatarPopup.setButtonText(false)
})
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
    addCardFormValidator.setSubmitButtonState()
     addCardPopup.open(newCardPopup) });
//9 Открытие попапа смены аватара
document.querySelector('.profile__redact-img').addEventListener('click', () => {
    const currentUserAvatar = userInfoClass.getUserAvatar();
    avatarInput.value = currentUserAvatar.avatar;
    editAvatarPopup.open(popupAvatar);
});
addCardPopup.setEventListeners(newCardPopup);
popupWithImageClass.setEventListeners(popupImgOpen);
editProfilePopup.setEventListeners(profilePopup);
editAvatarPopup.setEventListeners(popupAvatar);   //9
popupWithSubmitClass.setEventListeners(popupDeleteCard) //9