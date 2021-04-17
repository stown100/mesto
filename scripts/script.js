let editBtn = document.querySelector('.profile__edit');
let popup = document.querySelector('.popup');
let closeBtn = document.querySelector('.popup__close');
let likeBtn = document.querySelectorAll('.element__group');
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__role');
let formElement = document.querySelector('.popup__container');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');



editBtn.addEventListener('click', function () {
    popup.style.display = 'block';
})

closeBtn.addEventListener('click', function () {
    popup.style.display = 'none'
})

// likeBtn.forEach((like) => {
//     like.addEventListener('click', function () {
//         like.classList.toggle('active')
//     })
// })

formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
    evt.preventDefault();
    let valueJob = jobInput.value;
    let valueName = nameInput.value;
    profileTitle.textContent = valueName;
    profileSubtitle.textContent = valueJob;
    popup.style.display = 'none'
}




