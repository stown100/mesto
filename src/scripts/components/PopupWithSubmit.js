import { Popup } from "./Popup";

export class PopupWithSubmit extends Popup {
    constructor(popup, handleFormSubmit) {
        super(popup);
        this._form = this._popup.querySelector(".form");
        this._handleFormSubmit = handleFormSubmit;
      }
    
      setOnSubmit = (callback) => {
        this._handleFormSubmit = callback;
      };
    
      setEventListeners = () => {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault()
            this._handleFormSubmit();
        });
      };
    //   constructor(popup, handleFormSubmit) {
    //     super(popup);
    //     this._form = this._popup.querySelector(".form");
    //     this._handleFormSubmit = handleFormSubmit;
    //   }
    
    //   setOnSubmit = (callback) => {
    //     this._handleFormSubmit = callback;
    //   };
    
    //   setEventListener = () => {
    //     super.setEventListener();
    //     this._form.addEventListener("submit", this._handleFormSubmit);
    //   };

    // setEventListeners() {
    //     this._popup.addEventListener('submit', (evt) => {
    //         evt.preventDefault();
    //         this._saveNewCard();
    //     });
    // }
}