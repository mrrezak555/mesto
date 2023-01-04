const popupElementEdit = document.querySelector('#popupEdit');
const popupAddElement = document.querySelector('#addPopup');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddCardButton = document.querySelector('.profile__add-button');

const nameFormPopupElement = popupElementEdit.querySelector('#name');
const jobFormEPopuplement = popupElementEdit.querySelector('#job');
const newNamePopupCard = popupAddElement.querySelector('#new_name');
const newImagePopupCard = popupAddElement.querySelector('#new_image');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__occupation');

//Фото попап
const popupElementPhoto = document.querySelector('#photoPopup');
const popupElementPhotoClose = popupElementPhoto.querySelector('.popup__close');

export {popupElementEdit, popupAddElement, popupProfileOpenButton, popupAddCardButton, nameFormPopupElement, jobFormEPopuplement, newNamePopupCard, newImagePopupCard, nameElement, jobElement, popupElementPhoto, popupElementPhotoClose};