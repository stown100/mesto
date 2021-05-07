const editBtn = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeBtn = document.querySelector('.popup__close');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_role');
const formElement = document.querySelector('.popup__container');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const vectorBtn = document.querySelector('.profile__vector-button');
const append = document.querySelector('.append');
const closeVectorBtn = document.querySelector('.append__close');
const formAppend = document.querySelector('.form_append');
const appendInputTitle = document.querySelector('.form__input_type_title');
const appendInputLink = document.querySelector('.form__input_type_link');
const sectionElements = document.querySelector('.elements');
const template = document.querySelector('#tmplt').content;
const popups = document.querySelector('.popups');
const elementTitle = document.querySelector('.element__title');
const popupsCloses = document.querySelector('.popups__close');


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
function formSave(evt) {
    evt.preventDefault();
    const element = template.querySelector('.element').cloneNode(true);
    element.querySelector('.element__img').src = appendInputLink.value;
    element.querySelector('.element__title').textContent = appendInputTitle.value;
    sectionElements.prepend(element);

    const cardRemoveButtonNew = document.querySelector('.element__delete');
    function cardDelete(evt) {
        evt.target.closest('.element').remove();
        evt.path[2].remove()
    }
    cardRemoveButtonNew.addEventListener('click', cardDelete);

    const likeBtnNew = document.querySelector('.element__group');
    function likeNew() {
        likeBtnNew.classList.toggle('element__group_active');
    }
    likeBtnNew.addEventListener('click', likeNew);
    const imageOpenedNew = document.querySelector('.element__img');
    function openedNew(evt) {
        let target = evt.target;
        popups.classList.add('popups_opened');
        const popupsImg = document.querySelector('.popups__container_img');
        const popupsTitle = document.querySelector('.popups__title');
        popupsImg.src = target.src;
        popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
    }
    imageOpenedNew.addEventListener('click', openedNew);
};

//Открытие картинки в большом размере через третий попап
const imageOpened = document.querySelectorAll('.element__img');
imageOpened.forEach(item => {
    item.addEventListener('click', function (evt) {
        let target = evt.target;
        popups.classList.add('popups_opened');
        const popupsImg = document.querySelector('.popups__container_img');
        const popupsTitle = document.querySelector('.popups__title');
        popupsImg.src = target.src;
        popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
    });
});

//удаление карточек
let cardRemoveButton = document.querySelectorAll('.element__delete');
cardRemoveButton.forEach(i => {
    i.addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
});

//Лайки
let likeBtn = document.querySelectorAll('.element__group');
likeBtn.forEach((like) => {
    like.addEventListener('click', function () {
        like.classList.toggle('element__group_active');
    });
});

//Закрытие картинки в большом размере, крестик
function popupsClose() {
    popups.classList.remove('popups_opened');
};

//Открытие первого попапа
function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
};

//Закрытие первого папапа, крестик
function popupClose() {
    popup.classList.remove('popup_opened');
};

//Открытие второго попапа
function appendOpen() {
    append.classList.add('append_opened');
    appendInputTitle.value = appendInputTitle.textContent;
    appendInputLink.value = appendInputLink.textContent;
};

//Закрытие второго попапа, крестик
function appendClose() {
    append.classList.remove('append_opened');
};

//закрытие первого попапа через 'Сохранить'
function formSubmitHandler(evt) {
    evt.preventDefault();
    let valueJob = jobInput.value;
    let valueName = nameInput.value;
    profileTitle.textContent = valueName;
    profileSubtitle.textContent = valueJob;
    popup.classList.remove('popup_opened');
};

//Закрытие второго попапа через 'Сохранить'
function formSubmitSave() {
    append.classList.remove('append_opened');
}


//События
editBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);
vectorBtn.addEventListener('click', appendOpen);
closeVectorBtn.addEventListener('click', appendClose);
formAppend.addEventListener('submit', formSubmitSave);
popupsCloses.addEventListener('click', popupsClose);
formAppend.addEventListener('submit', formSave);