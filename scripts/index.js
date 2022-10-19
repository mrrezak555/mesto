const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = popupElement.querySelector('.popup__close');
const nameFormPopupElement = popupElement.querySelector('#name');
const jobFormEPopuplement = popupElement.querySelector('#job');
const submitFrom = popupElement.querySelector('.popup__form');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__occupation');

function openPopup(){
    nameFormPopupElement.value = nameElement.textContent;
    jobFormEPopuplement.value = jobElement.textContent;
    popupElement.classList.add('popup_opened');
}

function closePopup(){
    popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    nameElement.textContent = nameFormPopupElement.value;
    jobElement.textContent = jobFormEPopuplement.value;
    closePopup()
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
submitFrom.addEventListener('submit', formSubmitHandler);