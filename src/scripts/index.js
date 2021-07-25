import '../pages/index.css'
import {
    editAvatarForm, editProfileForm, editNewCardForm, 
    popupAvatar, profileTitle, profileSubtitle,
    configValidation, avatarInput, editDeledeForm,
    editBtn, profilePopup, popupDeleteCard,
    nameInput, jobInput,
    buttonOpenPopupCard, newCardPopup,
    sectionElements, popupImgOpen,
    cardSelector, initialCards, buttonDeleteCard,
} from './utils/constants';
import { FormValidator } from "./components/FormValidator.js";
import { Card } from "./components/Card.js";
import { Section } from "./components/Section.js";
import { PopupWithImage } from "./components/PopupWithImage.js";
import { PopupWithForm } from "./components/PopupWithForm.js";
import { UserInfo } from "./components/UserInfo.js";
import { Api } from './components/Api';    //9
import { Avatar } from './components/Avatar';//9
import { PopupWithSubmit } from './components/PopupWithSubmit';
const popupWithSubmitClass = new PopupWithSubmit(popupDeleteCard);
// console.log(popupWithSubmitClass)

const api = new Api({                   //9
    url: 'https://mesto.nomoreparties.co/v1/cohort-26',
    headers: {
      authorization: '4187936b-f13d-40c6-aac3-45e4140019db',
      'Content-Type': 'application/json'
    }
  });

  api.getInitialCards().then((res) => {                             //9 Добавил карточки с сервера
    const sectionClass = new Section({ items: res.reverse(), renderer: addCard }, sectionElements, api);
    sectionClass.renderItems();
    console.log('Пришли карточки')
  })


const avatarClass = new Avatar(avatarInput)
// const editAvatarPopup = new PopupWithForm(popupAvatar, (inputValues) => {   //9  Сделать сохранение аватара
// const avatarClass = new Avatar(avatarInput)
// debugger
//     avatarClass.setEventListeners
//     editAvatarPopup.close(popupAvatar)
//     addCardFormValidator.setSubmitButtonState();
// })

const editAvatarPopup = new PopupWithSubmit(popupAvatar, {
    handleFormSubmit: (input) => {
        api
        .setUserAvatar(popupAvatar.getInputValues())
        .catch((err) => {
          console.log('Ошибка');
        })
        .finally(() => {
          renderLoadingProfile(false, popupAvatar);
          popupAvatar.close();
          updateUserInfo();
        });
    }
  });
//   console.log(editAvatarPopup)

const userInfoClass = new UserInfo(profileTitle, profileSubtitle);
const editProfilePopup = new PopupWithForm(profilePopup, ({name, about}) => { 
    userInfoClass.setUserInfo({name: name, about: about})
    console.log(userInfoClass.setUserInfo({name: name, about: about}))
    editProfilePopup.close(profilePopup)//Сохранения попапа редактирования профиля
    })
    api.setUserInfo().then(({name, about}) => {   //ДОЛЖНЫ ОБНОВЛЯТЬСЯ ДАННЫЕ
        console.log({name, about})
                console.log('Должны прийти данные данные')
                userInfoClass.setUserInfo({name: name, about: about})
                userInfoClass.updataUserInfo();
              })


const popupWithImageClass = new PopupWithImage(popupImgOpen);
const addCardPopup = new PopupWithForm(newCardPopup, (inputValues) => {
    addCard( {name: inputValues.title, link: inputValues.link} )
    api.addTask({name: inputValues.title, link: inputValues.link});
    addCardPopup.close(newCardPopup);
    addCardFormValidator.setSubmitButtonState();
});                                         //Добавление новой карточки

const sectionClass = new Section({ items: initialCards, renderer: addCard }, sectionElements, api);

function addCard(item) {
    const card = new Card(item.name, item.link, cardSelector, () => {
        popupWithImageClass.open(item.name, item.link)
    }, api);
    const cardElement = card.createCard();
    sectionClass.addItem(cardElement);   //Меняю тут addItem на saveItem
}                                      //Вывод данных на стр.






const avatarFormValidator = new FormValidator(configValidation, editAvatarForm)
avatarFormValidator.enableValidation();  //Валидация формы редактирования аватара

const profileFormValidator = new FormValidator(configValidation, editProfileForm);
profileFormValidator.enableValidation(); //Валидация формы редактирования профиля

const addCardFormValidator = new FormValidator(configValidation, editNewCardForm);
addCardFormValidator.enableValidation(); //Валидация формы добавления карточки
//События
editBtn.addEventListener('click', () => {
    const currentUserInfo = userInfoClass.getUserInfo();
    nameInput.value = currentUserInfo.name;
    jobInput.value = currentUserInfo.about; editProfilePopup.open()
});                                 //Открытие попапа редактирования профиля
buttonOpenPopupCard.addEventListener('click', () => {
     addCardPopup.open(newCardPopup) });
document.querySelector('.profile__redact-img').addEventListener('click', () => { //9
    editAvatarPopup.open(popupAvatar);
});
// buttonDeleteCard.addEventListener('click', () => {
//     popupWithSubmitClass.open(popupDeleteCard);     //Открывает попап подтверждения
// })
addCardPopup.setEventListeners(newCardPopup);
popupWithImageClass.setEventListeners(popupImgOpen);
editProfilePopup.setEventListeners(profilePopup);
editAvatarPopup.setEventListeners(popupAvatar);   //9
// editDeletePopup.setEventListeners(popupDeleteCard) //9