import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._buttonSubmit = this._popup.querySelector('.form__button');
      }

      setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this); 
        });
        super.setEventListeners();
        }

        setFormSubmit = (callback) => {
          this._handleFormSubmit = callback;
        };

        setButtonText(over) {
          if (over) {
              this._buttonSubmit.textContent = 'Удаление...'
          } else {
              this._buttonSubmit.textContent = 'Да'
          }
      }
    }      