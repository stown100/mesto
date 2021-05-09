const editBtn = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_role');
const openProfilePopupContainer = document.querySelector('.popup__container');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const openProfilePopup = document.querySelector('.profile__vector-button');
const newCardPopup = document.querySelector('.append');
const closeNewCardPopup = document.querySelector('.append__close');
const saveNewCardPopup = document.querySelector('.form_append');
const appendInputTitle = document.querySelector('.form__input_type_title');
const appendInputLink = document.querySelector('.form__input_type_link');
const sectionElements = document.querySelector('.elements');
const template = document.querySelector('#tmplt').content;
const openImgPopup = document.querySelector('.popups');
const elementTitle = document.querySelector('.element__title');
const closeImgPopup = document.querySelector('.popups__close');
const popupsImg = document.querySelector('.popups__img');
const popupsTitle = document.querySelector('.popups__title');


const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
        alt: 'Архыз'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
        alt: 'Челябинская область'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
        alt: 'Иваново'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
        alt: 'Камчатка'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
        alt: 'Холмогорский район'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
        alt: 'Байкал'
    },
];

//Добавление карточек из массива
initialCards.forEach(({ name, link }) => {
    const element = template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__img').src = link;
    element.querySelector('.element__title').textContent = name;
    sectionElements.append(element);
});

//Добавление карточек с кнопки
function saveNewCard(evt) {
    evt.preventDefault();
    const element = template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__img').src = appendInputLink.value;
    element.querySelector('.element__img').alt = appendInputLink.value;
    element.querySelector('.element__title').textContent = appendInputTitle.value;
    sectionElements.prepend(element);
    newCardPopup.classList.remove('append_opened');
    const cardRemoveButtonNew = document.querySelector('.element__delete');
    cardRemoveButtonNew.addEventListener('click', cardDelete);
    const likeBtnNew = document.querySelector('.element__group');
    likeBtnNew.addEventListener('click', likeNew);
    const imageOpenedNew = document.querySelector('.element__img');
    imageOpenedNew.addEventListener('click', openedNew);
};
function cardDelete(evt) {
    evt.target.closest('.element').remove();
    evt.path[2].remove()
}
function likeNew(evt) {
    evt.target.classList.toggle('element__group_active');
}
function openedNew(evt) {
    const target = evt.target;
    openImgPopup.classList.add('popups_opened');
    popupsImg.src = target.src;
    popupsImg.alt = target.alt;
    popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
}

//Открытие картинки в большом размере через третий попап
const openedImages = document.querySelectorAll('.element__img');
openedImages.forEach(item => {
    item.addEventListener('click', function (evt) {
        const target = evt.target;
        openImgPopup.classList.add('popups_opened');
        const popupsImg = document.querySelector('.popups__img');
        const popupsTitle = document.querySelector('.popups__title');
        popupsImg.src = target.src;
        popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
    });
});

//удаление карточек
const cardRemoveButton = document.querySelectorAll('.element__delete');
cardRemoveButton.forEach(i => {
    i.addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
});

//Лайки
const likeBtn = document.querySelectorAll('.element__group');
likeBtn.forEach((like) => {
    like.addEventListener('click', function () {
        like.classList.toggle('element__group_active');
    });
});

//Закрытие картинки в большом размере, крестик
function popupsClose() {
    openImgPopup.classList.remove('popups_opened');
};

//Открытие первого попапа
function popupOpen() {
    profilePopup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

//Закрытие первого папапа, крестик
function popupClose() {
    profilePopup.classList.remove('popup_opened');
};

//Открытие второго попапа
function appendOpen() {
    newCardPopup.classList.add('append_opened');
    appendInputTitle.value = appendInputTitle.textContent;
    appendInputLink.value = appendInputLink.textContent;
};

//Закрытие второго попапа, крестик
function appendClose() {
    newCardPopup.classList.remove('append_opened');
};

//закрытие первого попапа через 'Сохранить'
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const valueJob = jobInput.value;
    const valueName = nameInput.value;
    profileTitle.textContent = valueName;
    profileSubtitle.textContent = valueJob;
    profilePopup.classList.remove('popup_opened');
};


//События
editBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupClose);
openProfilePopupContainer.addEventListener('submit', handleProfileFormSubmit);
openProfilePopup.addEventListener('click', appendOpen);
closeNewCardPopup.addEventListener('click', appendClose);
closeImgPopup.addEventListener('click', popupsClose);
saveNewCardPopup.addEventListener('submit', saveNewCard);