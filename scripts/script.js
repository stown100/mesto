const popupList = document.querySelectorAll('.popup');
const editBtn = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');
const closeProfilePopupElem = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_role');
const saveProfilePopup = document.querySelector('.popup__container_profile');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const openProfilePopupElem = document.querySelector('.profile__vector-button');
const newCardPopup = document.querySelector('.popup_images');
const closeNewCardPopup = document.querySelector('.popup__close_images');
const saveNewCardPopup = document.querySelector('.popup__container_images');
const appendInputTitle = document.querySelector('.form__input_type_title');
const appendInputLink = document.querySelector('.form__input_type_link');
const sectionElements = document.querySelector('.elements');
const template = document.querySelector('#tmplt').content;
const openImgPopup = document.querySelector('.popup_img');
const elementTitle = document.querySelector('.element__title');
const closeImgPopupElem = document.querySelector('.popup__close_img');
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
    sectionElements.prepend(createCard(appendInputTitle.value, appendInputLink.value)); //в начало списка передаю данные из createCard
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
    openPopup(openImgPopup);
    popupsImg.src = target.src;
    popupsImg.alt = target.alt;
    popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
}

//Вызов closePopup для закрытия попапа(третьего)
function closeImgPopup() {
    closePopup(openImgPopup);
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
    appendInputTitle.value = appendInputTitle.textContent;
    appendInputLink.value = appendInputLink.textContent;
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
};

//Функция закрытия попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened');
};

//События
editBtn.addEventListener('click', openProfilePopup);
closeProfilePopupElem.addEventListener('click', closeProfilePopup);
saveProfilePopup.addEventListener('submit', handleProfileFormSubmit);
openProfilePopupElem.addEventListener('click', openNewCardSavePopup);
closeNewCardPopup.addEventListener('click', closeNewCardSavePopup);
closeImgPopupElem.addEventListener('click', closeImgPopup);
saveNewCardPopup.addEventListener('submit', saveNewCard);
newCardPopup.addEventListener('click', closePopupIsOverlay);
openImgPopup.addEventListener('click', closePopupIsOverlay);
profilePopup.addEventListener('click', closePopupIsOverlay);


//Закрытие попапов при нажатии на overlay
function closePopupIsOverlay(evt) {
    if(evt.target === evt.currentTarget) {
        closePopup(evt.target)
    }
}

//Закрытие попапов через ESC
document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
        popupList.forEach((popup) => {
            popup.classList.remove('popup_opened');
        })
    }
})