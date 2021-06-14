const formElement = document.querySelector('.form[name="formNewCard"');
const formProfile = document.querySelector('.form[name="formRedactProfile"]');
const inputElementTitle = document.querySelector('.form__input[name="title"]');
const inputElementLink = document.querySelector('.form__input[name="link"]');
const inputElementName = document.querySelector('.form__input[name="name"]');
const inputElementRole = document.querySelector('.form__input[name="role"]');
const forms = document.querySelector('.form');
const inputElement = forms.querySelector('form__input');

function enableValidation(isValid) {
    const formList = Array.from(document.querySelectorAll(isValid.formSelector));
    formList.forEach((forms) => {
        forms.addEventListener('input', handleFormInput);
    })
    setInputListener(forms, isValid);
    // // formElement.addEventListener('submit', handleProfileFormSubmit);
    // formElement.addEventListener('input', handleFormInput);
    // // formProfile.addEventListener('submit', handleProfileFormSubmit);
    // formProfile.addEventListener('input', handleFormInput);
}

function setInputListener(forms, isValid) {
    const inputList = Array.from(forms.querySelector(isValid.inputSelector));
    const button = forms.querySelector(isValid.submitButtonSelector);
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            isValid(forms, inputElement);
        })
    })
}


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const form = evt.currentTarget;
    const isValid = form.checkValidity();
    if (isValid) {
        formElement.reset();
    }
}

function handleFormInput(evt) {
    const input = evt.target;
    const form = evt.currentTarget;
    setCastomError(input);  //Определяем невальдные поля и установим тексты ошибок
    validateProfile(input);
    setFieldError(input);  //Отобразим ошибки на форме
    setSubmitButtonState(form);   //Меняем кнопку
}


function setCastomError(input) {
    const validity = input.validity;
    input.setCustomValidity('');
    inputElementTitle.classList.remove('form__input-border-error-title');
    if (validity.tooShort || validity.tooLong) {
        const currentLength = input.value.length;
        const min = input.getAttribute('minlength');
        const max = input.getAttribute('maxlength');
        // inputElementTitle.setCustomValidity(`Строка неверной длины. Введите от ${min} до ${max} символов`);
        inputElementTitle.classList.add('form__input-border-error-title');
    }
    if (validity.typeMismatch) {
        // inputElementLink.setCustomValidity('Это не ссылка')
        inputElementLink.classList.add('form__input-border-error');
    }
    if (inputElementLink.checkValidity()) {
        inputElementLink.classList.remove('form__input-border-error');
    }
}
function validateProfile(input) {
    const validity = input.validity;
    input.setCustomValidity('');
    inputElementName.classList.remove('form__input-border-error-title');
    if (validity.tooShort || validity.tooLong) {
        const min = input.getAttribute('minlength');
        const max = input.getAttribute('maxlength');
        // inputElementName.setCustomValidity(`Поле неверной длины. Введите от ${min} до ${max} символов`);
        // inputElementRole.setCustomValidity(`Поле неверной длины. Введите от ${min} до ${max} символов`);
        inputElementName.classList.add('form__input-border-error-title');
        inputElementRole.classList.add('form__input-border-error');
    }
    if (inputElementRole.checkValidity()) {
        inputElementRole.classList.remove('form__input-border-error');
    }
    setFieldError(input);
}

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
        button.setAttribute('disabled', 'disabled');
    }
}

const isValid = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button_valid',
    inactiveButtonClass: '.form__button_invalid',
    inputErrorClass: 'form__input-error',
    errorClass: 'form__input'
}

enableValidation(isValid);