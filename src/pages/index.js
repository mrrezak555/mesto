import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
//import { initialCards } from '../utils/cards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { popupProfileOpenButton, popupAddCardButton, nameFormPopupElement, jobFormEPopuplement, selectors, popupChangeAvatarButton } from '../utils/constants.js';
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
const profileInfo = new UserInfo({
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
    profileInfo.setUserAvatar(data.avatar);
    profileInfo.setUserInfo({
      name: data.name,
      job: data.about
    })
    profileInfo.getMyId(data._id)

    //Карточки должны приходить тогда, когда известен ваш id.
    api.getInitialCards()
      .then((data) => {
        cardList.getSectionCards(data);
        cardList.renderer()
      })
      .catch((err) => { console.log(err) });
  })
  .catch((err) => { console.log(err) });


const cardList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item, profileInfo.myId, '#card');
    cardList.addItem(cardElement.generateCard());
  }
},
  '.grid'
);

function createCard(item, myId, templateSelector) {
  const cardElement = new Card(item, myId, templateSelector, {
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
          cardElement.setLikeActive();
        })
    },
    handleRemoveLike: (idCard) => {
      api.removeLike(idCard)
        .then((data) => {
          cardElement.setLikeCount(data.likes.length);
          cardElement.setLikeDisable()
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
      const cardaddElement = createCard(data, profileInfo.myId, '#card');
      cardList.addItem(cardaddElement.generateCard());
      popupAddCard.close();
    })
    .catch((err) => { console.log(err) })
    .finally(() => {
      this.submitButton.textContent = 'Создать';
    });
  //const cardaddElement = createCard(data);
  //cardList.addItem(cardaddElement);
}

function submitProfileForm(formValues) {
  api.editProfile({ name: formValues.name, about: formValues.job })
    .then(() => {
      profileInfo.setUserInfo(formValues);
      popupEdit.close();
    })
    .catch((err) => console.log(err))
}

function handleSubmitDeleteCard() {
  api.deleteCard()
    .then(() => {
      popupDelete.close();
      this.card.deleteItem();
    })
    .catch((err) => { console.log(err) })
}

function handleSubmitChangeCard() {
  const myAvatar = popupChangeAvatar.getInputValues().avatar;
  api.changeAvatar(myAvatar)
    .then(() => {
      profileInfo.setUserAvatar(myAvatar);
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
  const { nameProfile, infoProfile } = profileInfo.getInfo();
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