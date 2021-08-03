import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector(".form");
        this._buttonSubmit = this._popup.querySelector('.form__button-delete')
      }

      setEventListeners() {
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(); 
        });
        super.setEventListeners();
        }

        setOnSubmit = (callback) => {
          console.log('close')
          this._handleFormSubmit = callback;
        };

        setTextButton(over) {
          if (over) {
              this._submitButton.textContent = 'Удаление...'
          } else {
              this._submitButton.textContent = 'Ок'
          }
      }
    }      

    
      // setEventListeners = () => {
      //   super.setEventListeners(this._popup);
      //   this._popup.addEventListener("submit", (evt) => {
      //     console.log('закрываю')
      //       evt.preventDefault()
      //       this._handleFormSubmit();
      //   });
      // };
// }