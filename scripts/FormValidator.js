const forms = document.querySelector('.form');

const formProfile = document.querySelector('.form[name="formRedactProfile"]');
const formElement = document.querySelector('.form[name="formNewCard"]');

const configValidation = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_invalid',
    inputErrorClass: 'form__input-border-error',
    errorClass: 'form__input'
}
// import { configValidation } from './script.js'
class FormValidator {
    constructor(formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
        this._configValidation = configValidation;
        this._formElement = configValidation.formSelector;
        // this._formSelector = configValidation.formSelector;
        // this._inputSelector = forms.querySelector(configValidation.inputSelector);
        // this._submitButtonSelector = forms.querySelector(configValidation.submitButtonSelector);
        // this._inactiveButtonClass = configValidation.inactiveButtonClass;
        // this._inputErrorClass = configValidation.inputErrorClass;
        // this._errorClass = configValidation.errorClass;
    }

    _handleProfileFormSubmit(evt) {
        evt.preventDefault();
        const form = evt.currentTarget;
        const isValid = form.checkValidity();
        if (!isValid) {
            formElement.reset();
        }
    }

    _setCastomError(input) {
        const validity = input.validity;
        if (validity) {
            showError(input);
        }
        if (input.checkValidity()) {
            hideError(input);
        }
        setSubmitButtonState(forms);
    }
    
    _showError(input) {
        input.classList.add(configValidation.inputErrorClass);
    }

    _hideError(input) {
        input.classList.remove(configValidation.inputErrorClass);
    }
    
    _setFieldError(input) {
        const span = document.querySelector(`#${input.id}-error`);
        span.textContent = input.validationMessage;
    }
    
    _setSubmitButtonState(forms) {
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

    _handleFormInput(evt) {
        const input = evt.target;
        const form = evt.currentTarget;
        setCastomError(input);  //Определяем невальдные поля и установим тексты ошибок
        setFieldError(input);  //Отобразим ошибки на форме
        setSubmitButtonState(form);   //Меняем кнопку
    }

    enableValidation(configValidation) {
        const formList = Array.from(document.querySelectorAll(configValidation.formSelector));
        formList.forEach((forms) => {
            forms.addEventListener('input', handleFormInput);
        })
    }
}
console.log(new FormValidator())
// const validatorJS = new FormValidator(configValidation)
// class FormValidatorProfile extends FormValidator {
//     constructor(inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
//         super(inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
//         this._formSelector = formProfile;
//     }
// }
// // console.log(new FormValidatorProfile())
// class FormValidatorNewCard extends FormValidator {
//     constructor(inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
//         super(inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
//         this._formSelector = formElement;
//     }
// }

export { FormValidator }