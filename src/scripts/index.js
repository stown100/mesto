import '../pages/index.css'
import {
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

const userInfoClass = new UserInfo(nameInput, jobInput);
const popupWithImageClass = new PopupWithImage(popupImgOpen);
const popupWithFormClass = new PopupWithForm(newCardPopup, saveNewCard);
const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements);
sectionClass.renderItems();


formList.forEach((formSelector) => {
    const validation = new FormValidator(configValidation, formSelector);
    validation.enableValidation();
});
function addCard(item) {
    const card = new Card(item.name, item.link, cardSelector, (name, link) => { 
        popupWithImageClass.handleCardClick(name, link)});             //Какие данные должны приходить, чтоб карточка открывалась?
    const cardElement = card.createCard();
    sectionClass.addItem(cardElement);
}

//Закрытие второго попапа(Добавление карточек с кнопки)
function saveNewCard() {
    const card = new Card(inputTitleAppend.value, inputLinkAppend.value, cardSelector, popupWithImageClass.open);
    const cardElement = card.createCard();  //Скинул гит без константы и prepend
    document.querySelector(sectionElements).prepend(cardElement);                   //добавляем новую карточку в начало таблицы
    popupWithFormClass.close(newCardPopup);                            //Закрываем попап после добавления карточки
    formList.forEach((formSelector) => {                               //блокируем кнопку при сохранении
        const validation = new FormValidator(configValidation, formSelector);
        validation.setSubmitButtonState();
    });
};
// const popupClass = new Popup(popup)
//События
editBtn.addEventListener('click', () => { userInfoClass.getUserInfo(profilePopup) });
buttonClosePopupProfile.addEventListener('click', () => { userInfoClass.close(profilePopup) });
buttonClosePopupCard.addEventListener('click', () => { popupWithFormClass.close(newCardPopup) });
buttonClosePopupImg.addEventListener('click', () => popupWithImageClass.close());
popupSaveProfile.addEventListener('submit', () => userInfoClass.setUserInfo());
buttonOpenPopupCard.addEventListener('click', () => { popupWithFormClass.open(newCardPopup) });
popupNewCardSave.addEventListener('submit', saveNewCard);
popupWithFormClass.setEventListeners(newCardPopup);
popupWithImageClass.setEventListeners(popupImgOpen);
userInfoClass.setEventListeners(profilePopup);



                                                                //Старый код-позже удалить
// //Открытие первого попапа
// function openProfilePopup() {
//     nameInput.value = profileTitle.textContent;
//     jobInput.value = profileSubtitle.textContent;
//     openPopup(profilePopup);
// }

// //закрытие первого попапа через 'Сохранить'
// function handleProfileFormSubmit(evt) {
//     evt.preventDefault();
//     profileTitle.textContent = nameInput.value;
//     profileSubtitle.textContent = jobInput.value;
//     closePopup(profilePopup);
// };

//Открытие второго попапа
// function openNewCardSavePopup() {
//     open(newCardPopup);
//     inputTitleAppend.value = inputTitleAppend.textContent;
//     inputLinkAppend.value = inputLinkAppend.textContent;
// };




//Функция открытия попапа
// function openPopup(popup) {
//     popup.classList.add('popup_opened');
//     document.addEventListener('keydown', handleEscClose);
// };


// // Стирает бордер
// function deleteErrorClass() {
//     const inputElements = document.querySelectorAll('.form__input');
//     inputElements.forEach((input) => {
//         input.classList.remove('form__input-border-error');
//     })
//     deleteErrorMessage();
// }

// //Стирает текст ошибок
// function deleteErrorMessage() {
//     const span = document.querySelectorAll('.form__input-error');
//     span.forEach((sp) => {
//         sp.style.display = 'none'
//     })
// }

//Функция закрытия попапа
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', handleEscClose);
//     deleteErrorClass();
// };

//Закрытие попапов при нажатии на overlay
// function closePopupIsOverlay(evt) {
//     if (evt.target === evt.currentTarget) {
//         closePopup(evt.target)
//     }
// }

//Закрытие попапов через ESC
// function handleEscClose(evt) {
//     if (evt.key === 'Escape') {
//         const popupOpened = document.querySelector('.popup_opened');
//         closePopup(popupOpened);
//     }
// }