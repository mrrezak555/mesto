import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {popupElementEdit, popupAddElement, popupProfileOpenButton, popupAddCardButton, nameFormPopupElement, jobFormEPopuplement, newNamePopupCard, newImagePopupCard, nameElement, jobElement, popupElementPhoto, popupElementPhotoClose, selectors} from '../utils/constants.js';
import './index.css';


const profileFormValidator = new FormValidator(selectors, document.querySelector('#popupEdit'));
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

function createCard(item, newFun) {
  const cardElement = new Card(item, '#card', newFun)
  return cardElement.generateCard();
}

function submitCardForm(inputData) {
  const newData = 
  { 
    name: inputData.name,
    link: inputData.job
  };
  popupAddCard.close();
  const cardaddElement = createCard(newData,
    () => {
      popupWithImage.open(newData);
    });

  cardList.addItem(cardaddElement);
}

function submitProfileForm(formValues) {
  /*nameElement.textContent = nameFormPopupElement.value;
  jobElement.textContent = jobFormEPopuplement.value;
  closePopup(popupElementEdit);
  */
  popupEdit.close();
  cardsInfo.setUserInfo(formValues);
}

popupProfileOpenButton.addEventListener('click', () => {
  const { nameProfile, infoProfile} = cardsInfo.getInfo();
  nameFormPopupElement.value = nameProfile;
  jobFormEPopuplement.value = infoProfile;
  popupEdit.open();
  profileFormValidator.toggleButtonState();
  profileFormValidator.resetErrorMessage();
});


popupAddCardButton.addEventListener('click', () => {
  popupAddCard.open();
  cardFormValidator.toggleButtonState();
  cardFormValidator.resetErrorMessage();
});

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEdit.setEventListeners();
cardList.renderer();