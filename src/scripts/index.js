import '../pages/index.css'
import {
    editProfileForm, editNewCardForm, popupAvatar,
    profileTitle, profileSubtitle,
    configValidation,
    editBtn, profilePopup,
    nameInput, jobInput,
    buttonOpenPopupCard, newCardPopup,
    sectionElements, popupImgOpen,
    cardSelector, initialCards,
} from './utils/constants';
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from './components/Api';    //9
import { Avatar } from './components/Avatar';//9

const apiClass = new Api({                   //9
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: '4187936b-f13d-40c6-aac3-45e4140019db',
      'Content-Type': 'application/json'
    }
  });
  console.log(apiClass)

const avatarClass = new Avatar(popupAvatar, (inputValues) => {   //9
    avatarClass.setEventListeners(inputValues.link);
    avatarClass.close(popupAvatar)
})
console.log(avatarClass)
document.querySelector('.profile__redact-img').addEventListener('click', () => { //9
    avatarClass.open(popupAvatar)
})

const userInfoClass = new UserInfo(profileTitle, profileSubtitle);
const editProfilePopup = new PopupWithForm(profilePopup, (inputValues) => { 
    userInfoClass.setUserInfo(inputValues.name, inputValues.role)
    editProfilePopup.close(profilePopup) })//Сохранения попапа редактирования профиля

const popupWithImageClass = new PopupWithImage(popupImgOpen);
const addCardPopup = new PopupWithForm(newCardPopup, (inputValues) => {
    addCard( {name: inputValues.title, link: inputValues.link} )
    addCardPopup.close(newCardPopup);
    addCardFormValidator.setSubmitButtonState();
});                                         //Добавление новой карточки

const profileFormValidator = new FormValidator(configValidation, editProfileForm);
profileFormValidator.enableValidation(); //Валидация формы редактирования профиля

const addCardFormValidator = new FormValidator(configValidation, editNewCardForm);
addCardFormValidator.enableValidation(); //Валидация формы добавления карточки

const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements);
sectionClass.renderItems();

function addCard(item) {
    const card = new Card(item.name, item.link, cardSelector, () => {
        popupWithImageClass.open(item.name, item.link)
    });
    const cardElement = card.createCard();
    sectionClass.addItem(cardElement);
}                                      //Вывод массива на стр.

// apiClass.getInitialCards("users/me")                //3. Обратабываю ошибки, попадающие в .catch
// .then((result) => {
//   userInfoClass.avatar.style.backgroundImage = `url(${result.avatar})`;
//   owner.ownerId = result._id;

//   updateUserInfo(result.name, result.about);

//   return result;
// })
// .then((result) => popupEdit.setDefaultValue(result.name, result.about))
// .then(() => handleBlurEffect(false))
// .catch((err) => console.log(err));

//События
editBtn.addEventListener('click', () => {
    const currentUserInfo = userInfoClass.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.role; editProfilePopup.open()
});                                 //Открытие попапа редактирования профиля
buttonOpenPopupCard.addEventListener('click', () => {
     addCardPopup.open(newCardPopup) });
addCardPopup.setEventListeners(newCardPopup);
popupWithImageClass.setEventListeners(popupImgOpen);
editProfilePopup.setEventListeners(profilePopup);
avatarClass.setEventListeners(popupAvatar);   //9