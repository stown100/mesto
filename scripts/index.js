import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Popup } from "./Popup.js";                 //8
import { Section } from "./Section.js";             //8
import { PopupWithImage } from "./PopupWithImage.js"; //8
import { PopupWithForm } from "./PopupWithForm.js" //8
import { UserInfo } from "./UserInfo.js"           //8
const configValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__input-border-error',
    errorClass: 'form__input'
}

export const popup = '.popup';                      //8
const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
const editBtn = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');
const buttonClosePopupProfile = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_role');
const popupSaveProfile = document.querySelector('.popup__container_profile');
const buttonOpenPopupCard = document.querySelector('.profile__vector-button');
const newCardPopup = document.querySelector('.popup_images');
const buttonClosePopupCard = document.querySelector('.popup__close_images');
const popupNewCardSave = document.querySelector('.popup__container_images');
const inputTitleAppend = document.querySelector('.form__input_type_title');
const inputLinkAppend = document.querySelector('.form__input_type_link');
export const sectionElements = '.elements';
const popupImgOpen = document.querySelector('.popup_img');
const buttonClosePopupImg = document.querySelector('.popup__close_img');
export const cardSelector = '#tmplt';
const initialCards = [
    {
        name: 'Nissan Silvia s13',
        link: 'https://im0-tub-ru.yandex.net/i?id=33be3fce98a4a6c2b273f11fb825b542-l&n=13',
    },
    {
        name: 'Toyota Supra',
        link: 'https://avatars.mds.yandex.net/get-zen_doc/3310860/pub_60263f46b1a0bb52b45dcfd8_6026409afa0bd9159aa9d9ce/scale_1200',
    },
    {
        name: 'Nissan GTR',
        link: 'https://i.pinimg.com/originals/74/1c/a5/741ca51ca955fd9aa68e45b6a09ec7e0.jpg',
    },
    {
        name: 'Mazda RX-7',
        link: 'https://sun9-74.userapi.com/impf/c857432/v857432776/9cfb1/OUelKKO2zx8.jpg?size=1280x1280&quality=96&sign=e56f8a7fbcdc62443c948420b7b924f0&c_uniq_tag=KXvBLJjJs1yQdMaN5lgYZY-y0OjV01oGGKTAaftXl_E&type=album',
    },
    {
        name: 'Toyota Mark II',
        link: 'https://sun9-7.userapi.com/impf/c855136/v855136329/1b697a/y96JcBXh43M.jpg?size=604x604&quality=96&sign=3c051d99a7d7db35c5ab390034b71a33&type=album',
    },
    {
        name: 'Mitsubishi EVO 9',
        link: 'https://i.pinimg.com/originals/14/42/58/14425875af759f49e319307a732dcfd4.jpg',
    },
];

const userInfoClass = new UserInfo(nameInput, jobInput);
const popupWithImageClass = new PopupWithImage();
const popupWithFormClass = new PopupWithForm(popup, saveNewCard);
const sectionClass = new Section({items: initialCards, renderer: (item) => { addCard( item.name, item.link );}
}, sectionElements);
sectionClass.renderer();



formList.forEach((formSelector) => {
    const validation = new FormValidator(configValidation, formSelector);
    validation.enableValidation();
  });
function addCard() {
    initialCards.forEach((item) => {
        const card = new Card( item.name, item.link, cardSelector );
        const cardElement = card.createCard();
        sectionClass.addItem(cardElement);
      })
}

//Закрытие второго попапа(Добавление карточек с кнопки)
function saveNewCard() {
    const buttonElement = document.querySelector('.form[name="formNewCard"]')
    .querySelector(configValidation.submitButtonSelector);  //Находим кнопку
    buttonElement.classList.add(configValidation.inactiveButtonClass);  //Добавляем класс неактивной кнопки
    buttonElement.setAttribute('disabled', true);                       //ставим неактивную кнопку
    const card = new Card(inputTitleAppend.value, inputLinkAppend.value, cardSelector);
    const cardElement = card.createCard();  //Скинул гит без константы и prepend
    document.querySelector(sectionElements).prepend(cardElement);                   //добавляем новую карточку в начало таблицы
    popupWithFormClass.close(newCardPopup);                            //Закрываем попап после добавления карточки
};

//События
editBtn.addEventListener('click', () => {userInfoClass.getUserInfo(profilePopup)});
buttonClosePopupProfile.addEventListener('click', () => {userInfoClass.close(profilePopup)});
buttonClosePopupCard.addEventListener('click', () => {popupWithFormClass.close(newCardPopup)});
buttonClosePopupImg.addEventListener('click', () => popupWithImageClass.close(popupImgOpen));
popupSaveProfile.addEventListener('submit', () => userInfoClass.setUserInfo());
buttonOpenPopupCard.addEventListener('click', () => {popupWithFormClass.open(newCardPopup)});
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