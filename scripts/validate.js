/*const showInputError = (errorElement, errorMessage, inputElement, selectors) => {
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
    inputElement.classList.add(selectors.inputErrorClass);
}

const hideInputError = (errorElement, inputElement, selectors) => {
    errorElement.textContent = '';
    errorElement.classList.remove(selectors.errorClass);
    inputElement.classList.remove(selectors.inputErrorClass);
}

const checkInputValidity = (inputElement, selectors) => {
    const isValid = inputElement.validity.valid;
    const formSection = inputElement.closest(selectors.popupSection);
    const errorElement = formSection.querySelector(`${selectors.inputSelector}-error`);
    const inputElementTouch = formSection.querySelector(selectors.inputSelector);
    if (isValid) {
        hideInputError(errorElement, inputElementTouch, selectors);
    } else {
        showInputError(errorElement, inputElement.validationMessage, inputElementTouch, selectors);
    }
}

const toggleButtonState = (inputList, buttonElement, selectors) => {
    const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
    if (hasInvalidInput){
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(selectors.inactiveButtonClass);
    }else{
        if (buttonElement !== null){
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(selectors.inactiveButtonClass);
        }
    }
}

const setEventListeners = (formElement, selectors) =>{
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const submitButton = formElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputList, submitButton, selectors)
    inputList.forEach(inputElement => {
        inputElement.addEventListener('input', () =>{
            checkInputValidity(inputElement, selectors);
            toggleButtonState(inputList, submitButton, selectors);
        })
    })
}

const selectors = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
    popupSection: '.popup__section'};


const enableValidation = (selectors) => {
    const formList = document.querySelectorAll(selectors.formSelector);
    formList.forEach(formElement => {
        setEventListeners(formElement, selectors);
    })
}

function resetErrorMessage(popupItem, selectors){
    const inputElements = popupItem.querySelectorAll(selectors.inputSelector);
    inputElements.forEach(inputElement => {
      const formSection = inputElement.closest(selectors.popupSection);
      const errorMessage = formSection.querySelector(`${selectors.inputSelector}-error`);
      hideInputError(errorMessage, inputElement, selectors);
    })
}

function checkSubmitButtomOpeningPopup (popupElement, selectors) {
    const inputElements = Array.from(popupElement.querySelectorAll(selectors.inputSelector));
    const popupSubmit = popupElement.querySelector(selectors.submitButtonSelector);
    toggleButtonState(inputElements, popupSubmit, selectors);
}
*/
