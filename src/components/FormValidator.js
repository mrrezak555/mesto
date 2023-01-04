const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    popupSection: '.popup__section'
};

class FormValidator {
    constructor(data, form) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitButtonSelector = data.submitButtonSelector;
        this._inactiveButtonClass = data.inactiveButtonClass;
        this._inputErrorClass = data.inputErrorClass;
        this._errorClass = data.errorClass;
        this._popupSection = data.popupSection;
        this._form = form;
        this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
        this._submitButton = this._form.closest(this._formSelector).querySelector(this._submitButtonSelector);
    }

    _showInputError(errorElement, errorMessage, inputElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
        inputElement.classList.add(this._inputErrorClass);
    }

    _hideInputError(errorElement, inputElement) {
        errorElement.textContent = '';
        errorElement.classList.remove(this._errorClass);
        inputElement.classList.remove(this._inputErrorClass);
    }

    _checkInputValidity(inputElement) {
        const isValid = inputElement.validity.valid;
        const formSection = inputElement.closest(this._popupSection);
        const errorElement = formSection.querySelector(`${this._inputSelector}-error`);
        const inputElementTouch = formSection.querySelector(this._inputSelector);
        if (isValid) {
            this._hideInputError(errorElement, inputElementTouch);
        } else {
            this._showInputError(errorElement, inputElement.validationMessage, inputElementTouch, selectors);
        }
    }

    _toggleButtonState() {
        const hasInvalidInput = this._inputList.some(inputElement => !inputElement.validity.valid);
        if (hasInvalidInput) {
            this._submitButton.setAttribute('disabled', true);
            this._submitButton.classList.add(this._inactiveButtonClass);
        } else {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this._inactiveButtonClass);
        }
    }

    resetErrorMessage() {
        this._inputList.forEach(inputElement => {
            const formSection = inputElement.closest(this._popupSection);
            const errorMessage = formSection.querySelector(`${this._inputSelector}-error`);
            this._hideInputError(errorMessage, inputElement);
        })
    }

    enableValidation() {
        this._toggleButtonState()
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            })
        })
    }

    checkSubmitButtomOpeningPopup() {
        this._toggleButtonState();
    }
}

export { FormValidator, selectors };
