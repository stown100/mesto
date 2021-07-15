export class FormValidator {
  constructor(configValidation, formSelector) {
    this._configValidation = configValidation;
    this._formSelector = formSelector;
  }

  enableValidation() {
    this._formSelector.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._handleFormInput();
  }


  _handleFormInput() {
    this._inputList = Array.from(this._formSelector.querySelectorAll(this._configValidation.inputSelector));
    this.setSubmitButtonState();
    this._inputList.forEach((_input) => {
      _input.addEventListener("input", () => {
        this._setCastomError(_input);
        this.setSubmitButtonState();
      });
    });
  }

  _setCastomError(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  _setFieldError(input) {
    const span = this._formSelector.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;
  }

  _showError(input) {
    this._setFieldError(input);
    input.classList.add(this._configValidation.inputErrorClass);
  }

  _hideError(input) {
    this._setFieldError(input);
    input.classList.remove(this._configValidation.inputErrorClass);
    const span = this._formSelector.querySelector(`#${input.id}-error`);
  }

  setSubmitButtonState() {
    this._button = this._formSelector.querySelector(this._configValidation.submitButtonSelector);
    const isValid = this._formSelector.checkValidity();
    if (isValid) {
      this._button.classList.remove(this._configValidation.inactiveButtonClass);
      this._button.removeAttribute('disabled');
    }
    if (!isValid) {
      this._button.classList.add(this._configValidation.inactiveButtonClass);
      this._button.setAttribute('disabled', 'disabled');
    }
  };
}