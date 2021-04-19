let editBtn = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close');
let likeBtn = document.querySelectorAll('.element__group');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__role');
let formElement = document.querySelector('.popup__container');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


function popupOpen() {
    popup.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}


function popupClose() {
    popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
    evt.preventDefault();
    let valueJob = jobInput.value;
    let valueName = nameInput.value;
    profileTitle.textContent = valueName;
    profileSubtitle.textContent = valueJob;
    popup.classList.remove('popup_opened');
}

editBtn.addEventListener('click', popupOpen);
closeBtn.addEventListener('click', popupClose);
formElement.addEventListener('submit', formSubmitHandler);


// editBtn.addEventListener('click', function () {
//     popup.style.display = 'flex';
// })

// closeBtn.addEventListener('click', function () {
//     popup.style.display = 'none'
// })

// likeBtn.forEach((like) => {
//     like.addEventListener('click', function () {
//         like.classList.toggle('active')
//     })
// })




