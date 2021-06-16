const formElement = document.querySelector('.form[name="formNewCard"');
const formProfile = document.querySelector('.form[name="formRedactProfile"]');
const forms = document.querySelector('.form');
const inputElement = document.querySelector('.form__input');

function enableValidation(isValid) {
    const formList = Array.from(document.querySelectorAll(isValid.formSelector));
    formList.forEach((forms) => {
        forms.addEventListener('input', handleFormInput);
    })
}


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const isValid = form.checkValidity();
    if (!isValid) {
        formElement.reset();
    }
}

  
function handleFormInput(evt) {
    const input = evt.target;
    const form = evt.currentTarget;
    setCastomError(input);  //Определяем невальдные поля и установим тексты ошибок
    // validateProfile(input);
    setFieldError(input);  //Отобразим ошибки на форме
    setSubmitButtonState(form);   //Меняем кнопку
}

function setCastomError(input) {
    const validity = input.validity;
    if (validity) {
        input.classList.add('form__input-border-error');
    } 
    if (input.checkValidity()) {
        input.classList.remove('form__input-border-error');
    }
    // const inputList = Array.from(forms.querySelectorAll('.form__input'));
    setSubmitButtonState(formElement);
    // const buttonElement = formElement.querySelector('.form__submit');
    // setSubmitButtonState(inputList, buttonElement);
}
// function showError(input) {
//     input.classList.add('form__input-border-error');
// }
// function hideError(input) {
//     input.classList.remove('form__input-border-error');
// }

function setFieldError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;
}

function setSubmitButtonState(forms) {
    const button = forms.querySelector('.form__button');
    const isValid = forms.checkValidity();
    if (isValid) {
        button.classList.add('form__button_valid');
        button.classList.remove('form__button_invalid');
        button.removeAttribute('disabled');
    } else {
        button.classList.remove('form__button_valid');
        button.classList.add('form__button_invalid');
        button.setAttribute('disabled', true);
    }
}
    // const button = Array.from(document.querySelectorAll(isValid.submitButtonSelector));
    // button.forEach((button) => {
    //     if (isValid) {
    //         button.classList.add('form__button_valid');
    //         button.classList.remove('form__button_invalid');
    //         button.removeAttribute('disabled');     
    //     } else {
    //         button.classList.remove('form__button_valid');
    //         button.classList.add('form__button_invalid');
    //         button.setAttribute('disabled', 'disabled');
    //     }
    //     console.log('no')
    // })

const isValid = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button_valid',
    inactiveButtonClass: '.form__button_invalid',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__input'
}

enableValidation(isValid);