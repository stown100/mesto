import '../pages/index.css'
import {
    editProfileForm, editNewCardForm,
    profileTitle, profileSubtitle,
    configValidation,
    editBtn, profilePopup, buttonClosePopupProfile,
    nameInput, jobInput,
    buttonOpenPopupCard, newCardPopup, buttonClosePopupCard,
    sectionElements, popupImgOpen, buttonClosePopupImg,
    cardSelector, initialCards,
} from './utils/constants';
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";             //8
import { PopupWithImage } from "./components/PopupWithImage.js"; //8
import { PopupWithForm } from "./components/PopupWithForm.js" //8
import { UserInfo } from "./components/UserInfo.js"           //8

const userInfoClass = new UserInfo(profileTitle, profileSubtitle);
const editProfilePopup = new PopupWithForm(profilePopup, () => { 
    userInfoClass.setUserInfo(nameInput.value, jobInput.value)
    editProfilePopup.close(profilePopup) })//Сохранения попапа редактирования профиля

const popupWithImageClass = new PopupWithImage(popupImgOpen);
const addCardPopup = new PopupWithForm(newCardPopup, (inputValues) => {
    addCard( {name: inputValues.title, link: inputValues.link} ) //ревью
    addCardPopup.close(newCardPopup);
    addCardFormValidator.setSubmitButtonState();
});

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
}

//События
editBtn.addEventListener('click', () => {
    const currentUserInfo = userInfoClass.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.role; editProfilePopup.open()
});                                 //Открытие попапа редактирования профиля
buttonClosePopupProfile.addEventListener('click', () => { editProfilePopup.close(profilePopup) });
buttonClosePopupCard.addEventListener('click', () => { addCardPopup.close(newCardPopup) });
buttonClosePopupImg.addEventListener('click', () => { popupWithImageClass.close() });
buttonOpenPopupCard.addEventListener('click', () => { addCardPopup.open(newCardPopup) });
addCardPopup.setEventListeners(newCardPopup);
popupWithImageClass.setEventListeners(popupImgOpen);
editProfilePopup.setEventListeners(profilePopup);