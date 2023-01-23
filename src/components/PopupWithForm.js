import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);
        this._callBack = submitCallBack;
        this._inputList = this._popupItem.querySelectorAll('.popup__input');
        this.submitButton = this._popupItem.querySelector('.popup__submit');
        this._form = this._popupItem.querySelector('.popup__form');
    }

    getInputValues() {
        const formValues = {};
        this._inputList.forEach((input) => {
            formValues[input.name] = input.value;
        });
        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitButton.textContent = 'Сохранение...'
            this._callBack(this.getInputValues());
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}