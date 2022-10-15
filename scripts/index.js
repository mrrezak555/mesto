const popupElement = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closePopupButton = popupElement.querySelector('.popup__close');
const nameFormElement = popupElement.querySelector('#name')
const jobFormElement = popupElement.querySelector('#job')
const submitFrom = popupElement.querySelector('.popup__submit')
console.log(document.querySelector('.profile__name').textContent);
console.log(nameFormElement);

function openPopup(){
    nameFormElement.value = document.querySelector('.profile__name').textContent;
    jobFormElement.value = document.querySelector('.profile__occupation').textContent;
    popupElement.classList.remove('popup_disabled');
}

function closePopup(){
    popupElement.classList.add('popup_disabled');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    document.querySelector('.profile__name').textContent = nameFormElement.value;
    document.querySelector('.profile__occupation').textContent = jobFormElement.value;
    closePopup()
}

editButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
submitFrom.addEventListener('click', formSubmitHandler);