import '../pages/index.css'
import {
    profileTitle, profileSubtitle,
    configValidation, popup, formList,
    editBtn, profilePopup, buttonClosePopupProfile,
    nameInput, jobInput, popupSaveProfile,
    buttonOpenPopupCard, newCardPopup, buttonClosePopupCard,
    popupNewCardSave, inputTitleAppend, inputLinkAppend,
    sectionElements, popupImgOpen, buttonClosePopupImg,
    cardSelector, initialCards,
} from './utils/constants';
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";             //8
import { PopupWithImage } from "./components/PopupWithImage.js"; //8
import { PopupWithForm } from "./components/PopupWithForm.js" //8
import { UserInfo } from "./components/UserInfo.js"           //8
import { Popup } from './components/Popup';

const popupClass = new Popup(profilePopup);
const userInfoClass = new UserInfo(profileTitle, profileSubtitle);
const popupWithImageClass = new PopupWithImage(popupImgOpen); //Какие данные должны приходить, чтоб карточка открывалась?
const popupWithFormClass = new PopupWithForm(newCardPopup, saveNewCard);
const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements);
sectionClass.renderItems();

formList.forEach((formSelector) => {
    const validation = new FormValidator(configValidation, formSelector);
    validation.enableValidation();
});
function addCard(item) {
    const card = new Card(item.name, item.link, cardSelector, () => {
        popupWithImageClass.handleCardClick(item.name, item.link)});             //Какие данные должны приходить, чтоб карточка открывалась?
    const cardElement = card.createCard();
    sectionClass.addItem(cardElement);
}

//Закрытие второго попапа(Добавление карточек с кнопки)
function saveNewCard() {
    const card = new Card(inputTitleAppend.value, inputLinkAppend.value, cardSelector, () => {popupWithImageClass.open(popupImgOpen)});
    const cardElement = card.createCard();  //Скинул гит без константы и prepend
    document.querySelector(sectionElements).prepend(cardElement);                   //добавляем новую карточку в начало таблицы
    popupWithFormClass.close(newCardPopup);                            //Закрываем попап после добавления карточки
    formList.forEach((formSelector) => {                               //блокируем кнопку при сохранении
        const validation = new FormValidator(configValidation, formSelector);
        validation.setSubmitButtonState();
    });
};

//События
editBtn.addEventListener('click', () => { userInfoClass.getUserInfo(), popupClass.open() });
buttonClosePopupProfile.addEventListener('click', () => { popupClass.close(profilePopup) });
buttonClosePopupCard.addEventListener('click', () => { popupWithFormClass.close(newCardPopup) });
buttonClosePopupImg.addEventListener('click', () => popupWithImageClass.close());
popupSaveProfile.addEventListener('submit', () => {userInfoClass.setUserInfo(), popupClass.close()});
buttonOpenPopupCard.addEventListener('click', () => { popupWithFormClass.open(newCardPopup) });
popupWithFormClass.setEventListeners(newCardPopup);
popupWithImageClass.setEventListeners(popupImgOpen);
popupClass.setEventListeners(profilePopup);