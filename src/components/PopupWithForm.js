import Popup from "./Popup.js";


export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallBack) {
        super(popupSelector);
        this._callBack = submitCallBack;
        this._inputList = this._popupItem.querySelectorAll('.popup__input');
        this._submitButton = this._popupItem.querySelector('.popup__submit');
        this.formValues = {};
    }

    _getInputValues() {
        this._inputList.forEach((input) => {
            //console.log(input);
            this.formValues[input.name] = input.value;
        });
        //console.log(document.querySelector('#new_image').value)
        return this.formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form = this._popupItem.querySelector('.popup__form');
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            //console.log(this._form)
            this._getInputValues();
            this._callBack();
        });
    }
    close() {
        super.close();
        //console.log(this._form)
        this._form.reset();
    }
}