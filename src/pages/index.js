import { Card } from '../components/Card.js';
import { FormValidator, selectors } from '../components/FormValidator.js';
import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {popupElementEdit, popupAddElement, popupProfileOpenButton, popupAddCardButton, nameFormPopupElement, jobFormEPopuplement, newNamePopupCard, newImagePopupCard, nameElement, jobElement, popupElementPhoto, popupElementPhotoClose} from '../utils/constants.js';
import './index.css';


const profileFormValidator = new FormValidator(selectors, document.querySelector('.popup__form'));
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(selectors, document.querySelector('#submitAddPopup'));
cardFormValidator.enableValidation();


//console.log('popupWithImage');
const popupWithImage = new PopupWithImage('#photoPopup');
const popupAddCard = new PopupWithForm('#addPopup', submitCardForm);
const cardsInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__occupation'
});

const popupEdit = new PopupWithForm('#popupEdit', submitProfileForm);

// Класс для секции карточек
const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item,
      () => {
        popupWithImage.open(item);
      });
    cardList.addItem(cardElement);
  }
},
  '.grid'
);

function setPopupEditValues() {
  nameFormPopupElement.value = nameElement.textContent;
  jobFormEPopuplement.value = jobElement.textContent;
}



function createCard(item, newFun) {
  const cardElement = new Card(item, '#card', newFun)
  return cardElement.generateCard();
}

function submitCardForm() {
  //addCard(createCard(newNamePopupCard.value, newImagePopupCard.value),gridElement);
  //popupAddCard.close();
  //console.log(newImagePopupCard.value);
  const newData =
  {
    name: popupAddCard.formValues.name,
    link: popupAddCard.formValues.job
  };
  popupAddCard.close();
  const cardaddElement = createCard(newData,
    () => {
      popupWithImage.open(newData);
    });

  cardList.addItem(cardaddElement);
}

function submitProfileForm() {
  /*nameElement.textContent = nameFormPopupElement.value;
  jobElement.textContent = jobFormEPopuplement.value;
  closePopup(popupElementEdit);
  */
  popupEdit.close();
  //console.log(popupEdit.formValues);
  cardsInfo.setUserInfo(popupEdit.formValues);
}

function clearFildsOfPopup(popupItem) {
  newNamePopupCard.value = '';
  newImagePopupCard.value = '';
}

popupProfileOpenButton.addEventListener('click', () => {
  const { nameProfile, infoProfile} = cardsInfo.getInfo();
  nameFormPopupElement.value = nameProfile;
  jobFormEPopuplement.value = infoProfile;
  popupEdit.open();
  profileFormValidator.checkSubmitButtomOpeningPopup();
  profileFormValidator.resetErrorMessage();
});


popupAddCardButton.addEventListener('click', () => {
  clearFildsOfPopup(popupAddElement);
  popupAddCard.open();
  cardFormValidator.checkSubmitButtomOpeningPopup();
  cardFormValidator.resetErrorMessage();
});

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEdit.setEventListeners();
cardList.renderer();