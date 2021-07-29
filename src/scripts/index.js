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
import { Avatar } from './components/Avatar';//9
import { PopupWithSubmit } from './components/PopupWithSubmit';
const popupWithSubmitClass = new PopupWithSubmit(popupDeleteCard);
// console.log(popupWithSubmitClass)

const api = new Api({                   //9
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: '4187936b-f13d-40c6-aac3-45e4140019db',
      'Content-Type': 'application/json'
    }
  });
                                                            //Работа с карточками
  //Добавления карточек с сервера
  api.getInitialCards().then((res) => {
    const sectionClass = new Section({ items: res.reverse(), renderer: addCard }, sectionElements, api);
    sectionClass.renderItems();
    console.log('Пришли карточки')
  })

  //Добавление новой карточки
const addCardPopup = new PopupWithForm(newCardPopup, (inputValues) => {
    addCard( {name: inputValues.title, link: inputValues.link} )
    api.addTask({name: inputValues.title, link: inputValues.link});
    // addCardPopup.renderSaving(true);
    addCardPopup.close(newCardPopup);
    addCardFormValidator.setSubmitButtonState();
});

const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements, api);
const popupWithImageClass = new PopupWithImage(popupImgOpen);

function addCard(item) {
    const card = new Card(item.name, item.link, cardSelector, () => {
        popupWithImageClass.open(item.name, item.link)
    }, api);
    const cardElement = card.createCard();
    sectionClass.addItem(cardElement);
}                                      //Вывод данных на стр.

                                                        //Работа с редактированием профиля
const userInfoClass = new UserInfo(profileTitle, profileSubtitle, profileAvatar);
//Сохранение редактирования данных пользователя
const editProfilePopup = new PopupWithForm(profilePopup, ({name, about}) => {
    // editProfilePopup.renderSaving(true);
    userInfoClass.setUserInfo({name: name, about: about})
    editProfilePopup.close(profilePopup)//Сохранения попапа редактирования профиля
    //Отправляю данные профиля на сервер
    api.setUserInfo({name, about}).then(({name, about}) => {
        userInfoClass.setUserInfo({name: name, about: about})
        userInfoClass.updataUserInfo();
    })
})
console.log(userInfoClass)
//Прихоодят данные с сервера
api.getUserInfo().then(({name, about}) => {
    console.log({name, about})
    console.log('Пришли данные пользователя')
    userInfoClass.setUserInfo({name: name, about: about})
    userInfoClass.updataUserInfo();
  })
  

                                                //Работа с аватаром

api.getUserAvatar().then((avatar) => {     //Падает ошибка
    console.log(avatar)
    // debugger
    console.log('Должен прийти аватар');
    userInfoClass.setUserAvatar({avatar: avatar})
    userInfoClass.updataUserAvatar();
})
const editAvatarPopup = new PopupWithForm(popupAvatar, (avatar) => {
    // debugger
    userInfoClass.setUserAvatar(avatar)
    editAvatarPopup.close(popupAvatar)
    api.setUserAvatar(avatar).then((avatar) => {
        console.log(avatar)
        // profileAvatar.src = res.avatar
        userInfoClass.setUserAvatar(avatar)
        userInfoClass.updataUserAvatar();
        console.log(userInfoClass)  //Сюда приходит не ссылка, а обьект с name, about и avatar
    })
    // .finally(() => popupAvatar.renderSave(false));
})
const avatarClass = new Avatar(avatarInput)



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
// editDeletePopup.setEventListeners(popupDeleteCard) //9