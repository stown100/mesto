import '../pages/index.css'
import {
    editAvatarForm, editProfileForm, editNewCardForm, 
    popupAvatar, profileTitle, profileSubtitle,
    configValidation, avatarInput, editDeledeForm,
    editBtn, profilePopup, popupDeleteCard,
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

const api = new Api({                   //9
    url: 'https://mesto.nomoreparties.co/v1/cohort-26/cards',
    headers: {
      authorization: '4187936b-f13d-40c6-aac3-45e4140019db',
      'Content-Type': 'application/json'
    }
  });

  api.getInitialCards().then((res) => {                             //9 Добавил карточки с сервера
    // debugger
    const sectionClass = new Section({ items: res, renderer: addCard }, sectionElements, api);
    sectionClass.renderItems();
  })



const avatarClass = new Avatar(avatarInput)
const editAvatarPopup = new PopupWithForm(popupAvatar, (inputValues) => {   //9  Сделать сохранение аватара
    // submitAvatarForm()
    editAvatarPopup.close(popupAvatar)
    addCardFormValidator.setSubmitButtonState();
})
const editDeletePopup = new PopupWithForm(popupDeleteCard)

// const submitAvatarForm = (body, link, url) => {
//     return sendUserInfoRequest(body, link).then(() => {
//       userInfo.avatar.style.backgroundImage = `url(${url})`;
//       avatarFormValidator.removeEventListeners();
//     });
//   };
//   const addAvatarFormValidator = () => avatarFormValidator.openEvents(false);

const userInfoClass = new UserInfo(profileTitle, profileSubtitle);
const editProfilePopup = new PopupWithForm(profilePopup, (inputValues) => { 
    userInfoClass.setUserInfo(inputValues.name, inputValues.role)
    editProfilePopup.close(profilePopup) })//Сохранения попапа редактирования профиля

const popupWithImageClass = new PopupWithImage(popupImgOpen);
const addCardPopup = new PopupWithForm(newCardPopup, (inputValues) => {
    // addCard( {name: inputValues.title, link: inputValues.link} )
    api.addTask({name: inputValues.title, link: inputValues.link});
    // sectionClass.saveItem({name: inputValues.title, link: inputValues.link});
    // api.getInitialCards()
    addCardPopup.close(newCardPopup);
    addCardFormValidator.setSubmitButtonState();
});                                         //Добавление новой карточки

const avatarFormValidator = new FormValidator(configValidation, editAvatarForm)
avatarFormValidator.enableValidation();  //Валидация формы редактирования аватара

const profileFormValidator = new FormValidator(configValidation, editProfileForm);
profileFormValidator.enableValidation(); //Валидация формы редактирования профиля

const addCardFormValidator = new FormValidator(configValidation, editNewCardForm);
addCardFormValidator.enableValidation(); //Валидация формы добавления карточки

const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements);  //возможно не нужен
// sectionClass.renderItems();

function addCard(item) {
    const card = new Card(item.name, item.link, cardSelector, () => {
        popupWithImageClass.open(item.name, item.link)
    }, api);
    const cardElement = card.createCard();
    sectionClass.addItem(cardElement);   //Меняю тут addItem на saveItem
}                                      //Вывод данных на стр.


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
document.querySelector('.profile__redact-img').addEventListener('click', () => { //9
    editAvatarPopup.open(popupAvatar);
});
// document.querySelector('.element__delete').addEventListener('click', () => {
//     editDeletePopup.open(popupDeleteCard)
// })
addCardPopup.setEventListeners(newCardPopup);
popupWithImageClass.setEventListeners(popupImgOpen);
editProfilePopup.setEventListeners(profilePopup);
editAvatarPopup.setEventListeners(popupAvatar);   //9
editDeletePopup.setEventListeners(popupDeleteCard)