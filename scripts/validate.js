const formElement = document.querySelector('.form[name="formNewCard"]');
const forms = document.querySelector('.form');

const configValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__input-border-error',
    errorClass: 'form__input'
}

function enableValidation(configValidation) {
    const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
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
    setFieldError(input);  //Отобразим ошибки на форме
    setSubmitButtonState(form);   //Меняем кнопку
}

function setCastomError(input) {
    const validity = input.validity;
    if (validity) {
        showError(input);
    }
    if (input.checkValidity()) {
        hideError(input);
    }
    setSubmitButtonState(forms);
}

function showError(input) {
    input.classList.add(configValidation.inputErrorClass);
}
function hideError(input) {
    input.classList.remove(configValidation.inputErrorClass);
}

function setFieldError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;
}

function setSubmitButtonState(forms) {
    const button = forms.querySelector(configValidation.submitButtonSelector);
    const isValid = forms.checkValidity();
    if (isValid) {
        button.classList.remove(configValidation.inactiveButtonClass);
        button.removeAttribute('disabled');
    } else {
        button.classList.add(configValidation.inactiveButtonClass);
        button.setAttribute('disabled', true);
    }
}

enableValidation(configValidation);