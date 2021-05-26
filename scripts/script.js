const popup = document.querySelectorAll('popup');
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

initialCards.forEach(function (data) {
    sectionElements.append(createCard(data.name, data.link));
});

//Добавление карточек с кнопки
function saveNewCard(evt) {
    evt.preventDefault();
    sectionElements.prepend(createCard(appendInputTitle.value, appendInputLink.value));
    closePopup(newCardPopup);
};

//Добавление карточек из массива
function createCard(name, link) {
    const element = template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__img').src = link;
    element.querySelector('.element__img').alt = name;
    element.querySelector('.element__title').textContent = name;
    element.querySelector('.element__group').addEventListener('click', likeNew);
    element.querySelector('.element__delete').addEventListener('click', cardDelete);
    element.querySelector('.element__img').addEventListener('click', openedNew);
    return element;
}

//функция удаления карточки
function cardDelete(evt) {
    evt.target.closest('.element').remove();
}

//функция лайка
function likeNew(evt) {
    evt.target.classList.toggle('element__group_active');
}

//функция открытия картинки в большом размере
function openedNew(evt) {
    const target = evt.target;
    openPopup(openImgPopup);
    popupsImg.src = target.src;
    popupsImg.alt = target.alt;
    popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
}

//Закрытие картинки в большом размере, крестик
function closeImgPopup() {
    closePopup(openImgPopup);
};

//Открытие первого попапа
function openProfilePopup() {
    openPopup(profilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

//Закрытие первого папапа, крестик
function closeProfilePopup() {
    closePopup(profilePopup);
};

//Открытие второго попапа
function appendOpen() {
    openPopup(newCardPopup);
    appendInputTitle.value = appendInputTitle.textContent;
    appendInputLink.value = appendInputLink.textContent;
};

//Закрытие второго попапа, крестик
function appendClose() {
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


function openPopup(popup) {
    popup.classList.add('popup_opened');
};


function closePopup(popup) {
    popup.classList.remove('popup_opened');
};


//События
editBtn.addEventListener('click', openProfilePopup);
closeProfilePopupElem.addEventListener('click', closeProfilePopup);
saveProfilePopup.addEventListener('submit', handleProfileFormSubmit);
openProfilePopupElem.addEventListener('click', appendOpen);
closeNewCardPopup.addEventListener('click', appendClose);
closeImgPopupElem.addEventListener('click', closeImgPopup);
saveNewCardPopup.addEventListener('submit', saveNewCard);