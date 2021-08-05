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
} from './utils/constants';
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from './components/Api';
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
  })


  //Добавление новой карточки
const addCardPopup = new PopupWithForm(newCardPopup, (inputValues) => {
    api.addTask({name: inputValues.title, link: inputValues.link}).then((data) => {
        addCardPopup.setButtonText(true)
        addCard(data)
    })
    .catch(() => {
        console.log('Что-то сломалось!')
      })
    .finally(() => {
        addCardPopup.setButtonText(false)
        addCardPopup.close(newCardPopup);                          //закрытие попап
      })
});
const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements, api);
const popupWithImageClass = new PopupWithImage(popupImgOpen);

function addCard(data) {
    const card = new Card(data, cardSelector, () => {
        popupWithImageClass.open(data.name, data.link)
    },
    //Открываю попап подтверждения
    deleteCard, hendleCardLike,
    api);
    const cardElement = card.createCard();
    sectionClass.addItem(cardElement);
}                                      //Вывод данных на стр.


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
            })
            .catch(() => {
                console.log('Что-то сломалось!')
            })
            .finally(() => {
                popupWithSubmitClass.setButtonText(false)
                popupWithSubmitClass.close(popupDeleteCard)
        })
    })
}


                                                        //Работа с редактированием профиля
const userInfoClass = new UserInfo(profileTitle, profileSubtitle, profileAvatar);
//Сохранение редактирования данных пользователя
const editProfilePopup = new PopupWithForm(profilePopup, ({name, about}) => {
    //Отправляю данные профиля на сервер
    api.setUserInfo({name, about}).then(({name, about}) => {
        editProfilePopup.setButtonText(true)
        userInfoClass.setUserInfo({name: name, about: about})
        userInfoClass.updataUserInfo();
        })
        .catch(() => {
            console.log('Что-то сломалось!')
          })
        .finally(() => {
            editProfilePopup.setButtonText(false)
            editProfilePopup.close(profilePopup)//Сохранения попапа редактирования профиля
    })
})

//Прихоодят данные пользователя
api.getUserInfo().then(({name, about, avatar}) => {
    userInfoClass.setUserInfo({name: name, about: about})
    userInfoClass.updataUserInfo();
    userInfoClass.setUserInfo({avatar: avatar})
    userInfoClass.updataUserAvatar();
  })
  

                                                //Работа с аватаром
const editAvatarPopup = new PopupWithForm(popupAvatar, (avatar) => {
    userInfoClass.setUserInfo(avatar)
    api.setUserAvatar(avatar).then((avatar) => {
        editAvatarPopup.setButtonText(true)
        userInfoClass.setUserInfo(avatar)
        userInfoClass.updataUserAvatar();
    })
    .catch(() => {
        console.log('Что-то сломалось!')
      })
    .finally(() => { 
        editAvatarPopup.setButtonText(false)
        editAvatarPopup.close(popupAvatar) //закрытие попапа аватара профиля
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
    // console.log(currentUserInfo.nameInput)
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