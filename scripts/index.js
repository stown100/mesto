import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
const configValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__input-border-error',
    errorClass: 'form__input'
}

const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
const editBtn = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');
const buttonClosePopupProfile = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_role');
const popupSaveProfile = document.querySelector('.popup__container_profile');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonOpenPopupCard = document.querySelector('.profile__vector-button');
const newCardPopup = document.querySelector('.popup_images');
const buttonClosePopupCard = document.querySelector('.popup__close_images');
const popupNewCardSave = document.querySelector('.popup__container_images');
const inputTitleAppend = document.querySelector('.form__input_type_title');
const inputLinkAppend = document.querySelector('.form__input_type_link');
const sectionElements = document.querySelector('.elements');
const template = document.querySelector('#tmplt').content;
const popupImgOpen = document.querySelector('.popup_img');
const buttonClosePopupImg = document.querySelector('.popup__close_img');
const formElement = document.querySelector('.form[name="formNewCard"]');

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


formList.forEach((formSelector) => {
    const validation = new FormValidator(configValidation, formSelector);
    validation.enableValidation();
  });

initialCards.forEach((item) => {
    const card = new Card( item.name, item.link, template, openPopup, popupImgOpen);
    const cardElement = card.createCard();
    sectionElements.append(cardElement);
  })

//Закрытие третьего попапа(крестик)
function closeImgPopup() {
    closePopup(popupImgOpen);
};

//Открытие первого попапа
function openProfilePopup() {
    openPopup(profilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

//Закрытие первого попапа(крестик)
function closeProfilePopup() {
    closePopup(profilePopup);
};

//закрытие первого попапа через 'Сохранить'
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const valueJob = jobInput.value;
    const valueName = nameInput.value;
    profileTitle.textContent = valueName;
    profileSubtitle.textContent = valueJob;
    closePopup(profilePopup);
};


//Открытие второго попапа
function openNewCardSavePopup() {
    openPopup(newCardPopup);
    inputTitleAppend.value = inputTitleAppend.textContent;
    inputLinkAppend.value = inputLinkAppend.textContent;
};

//Закрытие второго попапа(крестик)
function closeNewCardSavePopup() {
    closePopup(newCardPopup);
};

//Закрытие второго попапа(Добавление карточек с кнопки)
function saveNewCard(evt) {
    evt.preventDefault();                                                               //чтоб небыло перезагрузски при сохранении
    const buttonElement = formElement.querySelector(configValidation.submitButtonSelector);  //Находим кнопку
    buttonElement.classList.add(configValidation.inactiveButtonClass);  //Добавляем класс неактивной кнопки
    buttonElement.setAttribute('disabled', true);                       //ставим неактивную кнопку
    const card = new Card(inputTitleAppend.value, inputLinkAppend.value, template, openPopup, popupImgOpen);
    const cardElement = card.createCard();
    sectionElements.prepend(cardElement);                   //добавляем новую карточку в начало таблицы
    closePopup(newCardPopup);                              //Закрываем попап после добавления карточки
};

//Функция открытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscPopup);
};

//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscPopup);
};

//Закрытие попапов при нажатии на overlay
function closePopupIsOverlay(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

//Закрытие попапов через ESC
function closeEscPopup(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
    }
}

//События
editBtn.addEventListener('click', openProfilePopup);
buttonClosePopupProfile.addEventListener('click', closeProfilePopup);
popupSaveProfile.addEventListener('submit', handleProfileFormSubmit);
buttonOpenPopupCard.addEventListener('click', openNewCardSavePopup);
buttonClosePopupCard.addEventListener('click', closeNewCardSavePopup);
buttonClosePopupImg.addEventListener('click', closeImgPopup);
popupNewCardSave.addEventListener('submit', saveNewCard);  //
newCardPopup.addEventListener('click', closePopupIsOverlay);
popupImgOpen.addEventListener('click', closePopupIsOverlay);
profilePopup.addEventListener('click', closePopupIsOverlay);