import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
//import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {popupProfileOpenButton, popupAddCardButton, nameFormPopupElement, jobFormEPopuplement, selectors, popupChangeAvatarButton} from '../utils/constants.js';
import './index.css';
import { Api } from '../components/Api.js';
//import { data } from 'autoprefixer';
import PopupForDelete from '../components/PopupForDelete.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: '474d22e2-c62e-47b3-b3f1-a0975af088eb',
    'Content-Type': 'application/json'
  }
});

const profileFormValidator = new FormValidator(selectors, document.querySelector('#popupEdit'));
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(selectors, document.querySelector('#submitAddPopup'));
cardFormValidator.enableValidation();

const popupChangeAvatar = new PopupWithForm("#putchAvatar", handleSubmitChangeCard);
const popupChangeAvatarValidator = new FormValidator(selectors, document.querySelector('#submitPutchAvatar'));
popupChangeAvatarValidator.enableValidation();


//console.log('popupWithImage');
const popupWithImage = new PopupWithImage('#photoPopup');
const popupDelete = new PopupForDelete('#deletePopup', handleSubmitDeleteCard)
const popupAddCard = new PopupWithForm('#addPopup', submitCardForm);
const cardsInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__occupation',
  avatarProfile: '.profile__avatar',
  api: api
});

const popupEdit = new PopupWithForm('#popupEdit', submitProfileForm);
/*
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
*/

// 1
api.getUserInfo()
.then((data) => {
  cardsInfo.setUserAvatar(data.avatar);
  cardsInfo.sentToServerInfo({
    name: data.name,
    job: data.about
  })
  cardsInfo.getMyId(data._id)
})
.catch((err) => {console.log(err)});


const cardList = new Section({
  renderer: (item) => {
    //console.log(item)
    if((item.owner.name === (cardsInfo.getInfo().nameProfile))){
      const cardElement = createCard(item, '#card_with_trash')
      const isOwnLike = item.likes.some((myLike) => {
         return myLike.name === cardsInfo.getInfo().nameProfile;
      })
      cardList.addItem(cardElement.generateCard());
      if( isOwnLike) {
        cardElement.setLikeActive();
      }
    }
    else {
      const cardElement = createCard(item, '#card_without_trash');
      const isOwnLike = item.likes.some((myLike) => {
        return myLike.name === cardsInfo.getInfo().nameProfile;
      })
      cardList.addItem(cardElement.generateCard());
      if( isOwnLike) {
        cardElement.setLikeActive();
      }
    }
  }
},
  '.grid'
);

//2
api.getInitialCards()
.then((data) => {
  //const initialCards = data.map((item) => {
    //return {name: item.name, link: item.link, likes: item.likes}
  //});
  cardList.getSectionCards(data);
  cardList.renderer()
})
.catch((err) => {console.log(err)});

function createCard(item, templateSelector) {
  const cardElement = new Card(item, templateSelector, {
    handleCardClick: () => {
      popupWithImage.open(item);
    },
    handleDeleteCard: () => {
      popupDelete.open();
      api.rememberId(item._id);
      popupDelete.getCard(cardElement);
    },
    handleAddLike: (idCard) => {
      api.addLike(idCard)
      .then((data) => {
        cardElement.setLikeCount(data.likes.length);
      })
    },
    handleRemoveLike: (idCard) => {
      console.log(idCard)
      api.removeLike(idCard)
      .then((data) => {
        cardElement.setLikeCount(data.likes.length);
      })
    }
  })
  return cardElement;
}

function submitCardForm(inputData) {
  const newData = 
  { 
    name: inputData.name,
    link: inputData.job,
  };
  api.addNewCard(newData)
   .then((data) => {
    const cardaddElement = createCard(data, '#card_with_trash');
    cardList.addItem(cardaddElement.generateCard());
   })
   .catch((err) => {console.log(err)})
   .finally(() => {
    this.submitButton.textContent = 'Создать';
  });
  popupAddCard.close();
  //const cardaddElement = createCard(data);
  //cardList.addItem(cardaddElement);
}

function submitProfileForm(formValues) {
  /*nameElement.textContent = nameFormPopupElement.value;
  jobElement.textContent = jobFormEPopuplement.value;
  closePopup(popupElementEdit);
  */
  popupEdit.close();
  cardsInfo.sentToServerInfo(formValues);
}

function handleSubmitDeleteCard(){
 api.deleteCard()
 .then(() =>{
  popupDelete.close();
  this.card.deleteItem();
 })
 .catch((err) => {console.log(err)})
}

function handleSubmitChangeCard(){
  api.changeAvatar(popupChangeAvatar.getInputValues().avatar)
   .then(() =>{
    cardsInfo.setUserAvatar(popupChangeAvatar.getInputValues().avatar);
    popupChangeAvatar.close()
   })
   .catch((err) => {
    console.log(`Ошибка. Запрос не выполнен ${err}`);  
  })
  .finally(() => {
    this.submitButton.textContent = 'Сохранить';
  });
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


popupChangeAvatarButton.addEventListener('click', () => {
  popupChangeAvatarValidator.resetErrorMessage();
  popupChangeAvatarValidator.toggleButtonState()
  popupChangeAvatar.open();
})

popupWithImage.setEventListeners();
popupAddCard.setEventListeners();
popupEdit.setEventListeners();
popupDelete.setEventListeners();
popupChangeAvatar.setEventListeners();