import {Card} from './Card.js';
import {FormValidator, selectors} from './FormValidator.js';
import {initialCards} from './cards.js'
const popupElementEdit = document.querySelector('#popupEdit');
const popupAddElement = document.querySelector('#addPopup');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddCardButton = document.querySelector('.profile__add-button');
const popupButtonClose = popupElementEdit.querySelector('.popup__close');
const popupButtonClosseForAdd = popupAddElement.querySelector('#close_button');

const nameFormPopupElement = popupElementEdit.querySelector('#name');
const jobFormEPopuplement = popupElementEdit.querySelector('#job');
const newNamePopupCard =  popupAddElement.querySelector('#new_name');
const newImagePopupCard =  popupAddElement.querySelector('#new_image');


const submittionFromForEditPopup = popupElementEdit.querySelector('.popup__form');
const submittionFromAddPopup = popupAddElement.querySelector('#submitAddPopup');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__occupation');

//Фото попап
const popupElementPhoto = document.querySelector('#photoPopup');
const popupElementPhotoClose = popupElementPhoto.querySelector('.popup__close');
const popupImage = popupElementPhoto.querySelector('.popup__image');
const popupSubtitle = popupElementPhoto.querySelector('.popup__subtitle');


const form1 = new FormValidator(selectors, document.querySelector('.popup__form'));
form1.enableValidation();

const form2 = new FormValidator(selectors, document.querySelector('#submitAddPopup'));
form2.enableValidation();

// создали шаблон карточки
const cardTemplate = document.querySelector('#card').content;

// Выбираем куда вставлять будем 
const gridElement = document.querySelector('.grid');


function addCard(card, container) {
  container.prepend(card);
} 

function setPopupPhotoValue(srcIn, nameIn){
  popupImage.src = srcIn;
  popupImage.alt = nameIn;
  popupSubtitle.textContent = nameIn;
}

function setPopupEditValues(){
  nameFormPopupElement.value = nameElement.textContent;
  jobFormEPopuplement.value = jobElement.textContent;
}

function openPopup(popupItem){
  popupItem.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupByClickOnEsc);
}

function closePopup(popupItem){
  popupItem.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByClickOnEsc);
}

function submitCardForm () {
  //addCard(createCard(newNamePopupCard.value, newImagePopupCard.value),gridElement);
  const cardItem = new Card({name: `${newNamePopupCard.value}`, link: `${newImagePopupCard.value}`}, '#card')
  addCard(cardItem.generateCard(), gridElement);
  closePopup(popupAddElement);
}

function submitProfileForm (){
  nameElement.textContent = nameFormPopupElement.value;
  jobElement.textContent = jobFormEPopuplement.value;
  closePopup(popupElementEdit);
}

function clearFildsOfPopup (popupItem) {
  newNamePopupCard.value = '';
  newImagePopupCard.value = '';
}

popupProfileOpenButton.addEventListener('click', () => {
  setPopupEditValues();
  openPopup(popupElementEdit);
  form1.checkSubmitButtomOpeningPopup();
  form1.resetErrorMessage();
});
popupButtonClose.addEventListener('click', () => {
  closePopup(popupElementEdit);
});
submittionFromForEditPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitProfileForm();
});

popupAddCardButton.addEventListener('click', () => {
  clearFildsOfPopup(popupAddElement);
  openPopup(popupAddElement);
  form2.checkSubmitButtomOpeningPopup();
});
popupButtonClosseForAdd.addEventListener('click', () => {
  closePopup(popupAddElement);
  form2.resetErrorMessage();
});
submittionFromAddPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  submitCardForm();
});

popupElementPhotoClose.addEventListener('click', () => {
  closePopup(popupElementPhoto);
});

//enableValidation(selectors);

const closePopupByClickOnOverlay = (event, popupElement) =>{
  if (event.target === event.currentTarget){
    closePopup(popupElement);
  }
};

const closePopupByClickOnEsc = (evt) =>{
  if (evt.key === 'Escape'){
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

const popupElements = document.querySelectorAll('.popup');

popupElements.forEach(popupElement => {
  popupElement.addEventListener('click', (evt) => {
    closePopupByClickOnOverlay(evt, popupElement);
  })
});

initialCards.forEach((item) => {
  const card = new Card(item, '#card');
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.grid').append(cardElement);
});

export {openPopup};