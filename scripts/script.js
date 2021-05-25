const popup = document.querySelectorAll('popup');
const editBtn = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.popup_profile');
const closeProfilePopup = document.querySelector('.popup__close_profile');
const nameInput = document.querySelector('.form__input_type_name');
const jobInput = document.querySelector('.form__input_type_role');
const saveProfilePopup = document.querySelector('.popup__container_profile');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const openProfilePopup = document.querySelector('.profile__vector-button');
const newCardPopup = document.querySelector('.popup_images');
const closeNewCardPopup = document.querySelector('.popup__close_images');
const saveNewCardPopup = document.querySelector('.popup__container_images');
const appendInputTitle = document.querySelector('.form__input_type_title');
const appendInputLink = document.querySelector('.form__input_type_link');
const sectionElements = document.querySelector('.elements');
const template = document.querySelector('#tmplt').content;
const openImgPopup = document.querySelector('.popup_img');
const elementTitle = document.querySelector('.element__title');
const closeImgPopup = document.querySelector('.popup__close_img');
const popupsImg = document.querySelector('.popup__img');
const popupsTitle = document.querySelector('.popup__title');



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

initialCards.forEach(function ({name, link, alt}) {
    const element = template.querySelector('.element').cloneNode(true);
    saveCard(link, alt, name, element)
    sectionElements.append(element);
});


//Добавление карточек с кнопки
function saveNewCard(evt) {
    evt.preventDefault();
    const element = template.querySelector('.element').cloneNode(true);
    saveCard(appendInputLink.value, appendInputLink.value, appendInputTitle.value, element)
    removePopup(newCardPopup);
    sectionElements.prepend(element);
};

function saveCard(imgSrc, imgAlt = 'Картинка', titleText, element) {
    element.querySelector('.element__img').src = imgSrc;
    element.querySelector('.element__img').alt = imgAlt;
    element.querySelector('.element__title').textContent = titleText;
    element.querySelector('.element__group').addEventListener('click', likeNew);
    element.querySelector('.element__delete').addEventListener('click', cardDelete);
    element.querySelector('.element__img').addEventListener('click', openedNew);
}
//Первый способ добавления массива
// initialCards.forEach(({ name, link }) => {
//     const element = template.querySelector('.element').cloneNode(true);
//     element.querySelector('.element__img').src = link;
//     element.querySelector('.element__title').textContent = name;
//     sectionElements.append(element);
// });

//Второй способ
// for (let i = 0; i < initialCards.length; i +=1) {
//     const currentItem = initialCards[i]
//     const element = template.querySelector('.element').cloneNode(true);
//     const imageOpenedNew = element.querySelector('.element__img');
//     const elementTitle = element.querySelector('.element__title');
//     element.querySelector('.element__group').addEventListener('click', likeNew);
//     element.querySelector('.element__delete').addEventListener('click', cardDelete);
//     imageOpenedNew.addEventListener('click', openedNew);
//     imageOpenedNew.src = currentItem.link;
//     imageOpenedNew.alt = currentItem.alt;
//     elementTitle.textContent = currentItem.name;
//     sectionElements.append(element);
// }

//Добавление карточек из массива   (3)   //20.05
// const createCard = (name, link, alt) => {
//     const element = template.querySelector('.element').cloneNode(true);
//     // const cardRemoveButtonNew = element.querySelector('.element__delete');
//     // const likeBtnNew = element.querySelector('.element__group');
//     const imageOpenedNew = element.querySelector('.element__img');
//     const elementTitle = element.querySelector('.element__title');
//     element.querySelector('.element__group').addEventListener('click', likeNew);
//     element.querySelector('.element__delete').addEventListener('click', cardDelete);
//     imageOpenedNew.addEventListener('click', openedNew);
//     imageOpenedNew.src = link;
//     imageOpenedNew.alt = alt;
//     elementTitle.textContent = name;
//     sectionElements.append(element);
// }
// console.log(document.body.prepend(createCard('Архыз', 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg')))
// template.addEventListener('submit', createCard);        //20.05


// initialCards.forEach(function (currentItem) {
//     const element = createCard(currentItem);
//     sectionElements.append(element);
//     recalculateCount();
// });
// const createCard = () => {
//     element.forEach((link, name) => {
//     const element = template.querySelector('.element').cloneNode(true);
//     element.querySelector('.element__img').src = link;
//     element.querySelector('.element__title').textContent = name;
//     sectionElements.append(element);
//     return template;
//     })


//функция удаления карточки
function cardDelete(evt) {
    evt.target.closest('.element').remove();
    evt.path[2].remove()
}

//функция лайка
function likeNew(evt) {
    evt.target.classList.toggle('element__group_active');
}

//функция открытия картинки в большом размере
function openedNew(evt) {
    const target = evt.target;
    addPopup(openImgPopup);
    popupsImg.src = target.src;
    popupsImg.alt = target.alt;
    popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
}

// //Открытие картинки в большом размере через третий попап
// const openedImages = document.querySelectorAll('.element__img');
// openedImages.forEach(item => {
//     item.addEventListener('click', function (evt) {
//         const target = evt.target;
//         addPopup(openImgPopup);
//         const popupsImg = document.querySelector('.popup__img');
//         const popupsTitle = document.querySelector('.popup__title');
//         popupsImg.src = target.src;
//         popupsTitle.textContent = target.parentElement.querySelector('.element__title').textContent;
//     });
// });

// //удаление карточек
// const cardRemoveButton = document.querySelectorAll('.element__delete');
// cardRemoveButton.forEach(i => {
//     i.addEventListener('click', function (evt) {
//         evt.target.closest('.element').remove();
//     });
// });

//Закрытие картинки в большом размере, крестик
function popupsClose() {
    removePopup(openImgPopup);
};

//Открытие первого попапа
function popupOpen() {
    addPopup(profilePopup);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

//Закрытие первого папапа, крестик
function popupClose() {
    removePopup(profilePopup);
};

//Открытие второго попапа
function appendOpen() {
    addPopup(newCardPopup);
    appendInputTitle.value = appendInputTitle.textContent;
    appendInputLink.value = appendInputLink.textContent;
};

//Закрытие второго попапа, крестик
function appendClose() {
    removePopup(newCardPopup);
};

//закрытие первого попапа через 'Сохранить'
function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const valueJob = jobInput.value;
    const valueName = nameInput.value;
    profileTitle.textContent = valueName;
    profileSubtitle.textContent = valueJob;
    removePopup(profilePopup);
};


function addPopup(popup) {
    popup.classList.add('popup_opened');
};
function removePopup(popup) {
    popup.classList.remove('popup_opened');
};


//События
editBtn.addEventListener('click', popupOpen);
closeProfilePopup.addEventListener('click', popupClose);
saveProfilePopup.addEventListener('submit', handleProfileFormSubmit);
openProfilePopup.addEventListener('click', appendOpen);
closeNewCardPopup.addEventListener('click', appendClose);
closeImgPopup.addEventListener('click', popupsClose);
saveNewCardPopup.addEventListener('submit', saveNewCard);