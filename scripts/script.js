const popupList = document.querySelectorAll('.popup');
const editBtn = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');
const buttonClosePopupProfile = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_role');
const popupSaveProfile = document.querySelector('.popup__container_profile');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonClosePopupCard = document.querySelector('.profile__vector-button');
const newCardPopup = document.querySelector('.popup_images');
const popupNewCardClose = document.querySelector('.popup__close_images');
const popupNewCardSave = document.querySelector('.popup__container_images');
const inputTitleAppend = document.querySelector('.form__input_type_title');
const inputLinkAppend = document.querySelector('.form__input_type_link');
const sectionElements = document.querySelector('.elements');
const template = document.querySelector('#tmplt').content;
const popupImgOpen = document.querySelector('.popup_img');
const elementTitle = document.querySelector('.element__title');
const buttonClosePopupImg = document.querySelector('.popup__close_img');
const popupsImg = document.querySelector('.popup__img');
const popupsTitle = document.querySelector('.popup__title');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    },
];

//Добавление карточек из массива
function createCard(name, link) {
    const element = template.querySelector('.element').cloneNode(true); //клонирую элемент
    element.querySelector('.element__img').src = link;                  //передаю данные
    element.querySelector('.element__img').alt = name;                  //передаю данные
    element.querySelector('.element__title').textContent = name;        //передаю данные
    element.querySelector('.element__group').addEventListener('click', likeCard); //обработчик события лайка
    element.querySelector('.element__delete').addEventListener('click', deleteCard); //обработчик события удаления
    element.querySelector('.element__img').addEventListener('click', openedCard); //обработчик события открытия в большом размере
    return element;                                                     //возвращаю элемент
}

//Вызов функции createCard для добавления карточек из мессива
initialCards.forEach(function (data) {                         //Перебираю массив методом forEach
    sectionElements.append(createCard(data.name, data.link));  //Добавляю карточки в начало списка с помощью вызова createCard
});

//Добавление карточек с кнопки
function saveNewCard(evt) {
    evt.preventDefault();                                                               //чтоб небыло перезагрузски при сохранении
    sectionElements.prepend(createCard(inputTitleAppend.value, inputLinkAppend.value)); //в начало списка передаю данные из createCard
    closePopup(newCardPopup);                              //вызываю closePopup для закрытия второго попапа, после добавления карточки
};

//функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.element').remove();
}

//функция лайка
function likeCard(evt) {
    evt.target.classList.toggle('element__group_active');
}

//функция открытия картинки в большом размере
function openedCard(evt) {
    const target = evt.target;
    openPopup(popupImgOpen);
    popupsImg.src = target.src;
    popupsImg.alt = target.alt;
    popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
}

//Вызов closePopup для закрытия попапа(третьего)
function closeImgPopup() {
    closePopup(popupImgOpen);
};

// function closePopupOverlay() {

// }

//Вызов openPopup для открытия попапа(первого)
function openProfilePopup() {
    openPopup(profilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

//Вызов closePopup для закрытия попапа(первого)
function closeProfilePopup() {
    closePopup(profilePopup);
};

//Вызов openPopup для открытия попапа(второго)
function openNewCardSavePopup() {
    openPopup(newCardPopup);
    inputTitleAppend.value = inputTitleAppend.textContent;
    inputLinkAppend.value = inputLinkAppend.textContent;
};

//Вызов ф-и closePopup для закрытия попапа(второго)
function closeNewCardSavePopup() {
    closePopup(newCardPopup);
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

//Функция закрытия попапа
function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeEscPopup);
};

//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeEscPopup);
};

//События
editBtn.addEventListener('click', openProfilePopup);
buttonClosePopupProfile.addEventListener('click', closeProfilePopup);
popupSaveProfile.addEventListener('submit', handleProfileFormSubmit);
buttonClosePopupCard.addEventListener('click', openNewCardSavePopup);
popupNewCardClose.addEventListener('click', closeNewCardSavePopup);
buttonClosePopupImg.addEventListener('click', closeImgPopup);
popupNewCardSave.addEventListener('submit', saveNewCard);
newCardPopup.addEventListener('click', closePopupIsOverlay);
popupImgOpen.addEventListener('click', closePopupIsOverlay);
profilePopup.addEventListener('click', closePopupIsOverlay);


//Закрытие попапов при нажатии на overlay
function closePopupIsOverlay(evt) {
    if(evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

//Закрытие попапов через ESC
function closeEscPopup(evt) {
    if (evt.key === 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
        console.log('no')
    }
}