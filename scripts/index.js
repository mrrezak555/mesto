const popupElementEdit = document.querySelector('#popupEdit');
const popupAddElement = document.querySelector('#addPopup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupButtonClose = popupElementEdit.querySelector('.popup__close');
const popupButtonClosseForAdd = popupAddElement.querySelector('#close_button');

const nameFormPopupElement = popupElementEdit.querySelector('#name');
const jobFormEPopuplement = popupElementEdit.querySelector('#job');
const newNamePopupCard =  popupAddElement.querySelector('#new_name');
const newImagePopupCard =  popupAddElement.querySelector('#new_image');


const submitFromForEditPopup = popupElementEdit.querySelector('.popup__form');
const submitFromAddPopup = popupAddElement.querySelector('#submitAddPopup');

const nameElement = document.querySelector('.profile__name');
const jobElement = document.querySelector('.profile__occupation');

//Фото попап
const popupElementPhoto = document.querySelector('#photoPopup');
const closePopupElementPhoto = popupElementPhoto.querySelector('.popup__close');
const popupImage = popupElementPhoto.querySelector('.popup__image');
const popupSubtitle = popupElementPhoto.querySelector('.popup__subtitle');

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// создали шаблон карточки
const cardTemplate = document.querySelector('#card').content;

// Выбираем куда вставлять будем 
const gridElement = document.querySelector('.grid');

// Пробежимся по массиву и зададим атрибуты
for (let i = 0; i < initialCards.length; i++){
    addCard(initialCards[i].name, initialCards[i].link)
  }

function addCard(cardName, cardLink) {
  const cardElement = cardTemplate.querySelector('.grid__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.grid__image')
  cardImage.src = cardLink;
  cardImage.alt = cardName;
  cardElement.querySelector('.grid__title').textContent = cardName;
  const likeTemple = cardElement.querySelector('.grid__like');
  const trashButton = cardElement.querySelector('.grid__trash')
  likeTemple.addEventListener('click', () => {
    likeTemple.classList.toggle('grid__like_active');
  })
  trashButton.addEventListener('click', () => {
    trashButton.closest('.grid__item').remove();
  })
  cardImage.addEventListener('click', () => {
    setPopupPhotoValue(cardLink, cardName);
    openPopup(popupElementPhoto);
  })
  gridElement.prepend(cardElement);
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
  checkSubmitButtomOpeningPopup(popupItem, selectors);
  document.addEventListener("keydown", closePopupByClickOnEsc);
}

function closePopup(popupItem){
  popupItem.classList.remove('popup_opened');
  resetErrorMessage(popupItem, selectors);
}

function handleFormSubmitPopupAdd () {
  addCard(newNamePopupCard.value, newImagePopupCard.value);
  closePopup(popupAddElement);
}

function handleFormSubmitPopupEdit (){
  nameElement.textContent = nameFormPopupElement.value;
  jobElement.textContent = jobFormEPopuplement.value;
  closePopup(popupElementEdit);
}

function clearFildsOfPopup (popupItem) {
  newNamePopupCard.value = '';
  newImagePopupCard.value = '';
}

editButton.addEventListener('click', () => {
  setPopupEditValues();
  openPopup(popupElementEdit);
});
popupButtonClose.addEventListener('click', () => {
  closePopup(popupElementEdit);
});
submitFromForEditPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleFormSubmitPopupEdit();
});

addButton.addEventListener('click', () => {
  clearFildsOfPopup(popupAddElement);
  openPopup(popupAddElement);
});
popupButtonClosseForAdd.addEventListener('click', () => {
  closePopup(popupAddElement);
});
submitFromAddPopup.addEventListener('submit', (evt) => {
  evt.preventDefault();
  handleFormSubmitPopupAdd();
});

closePopupElementPhoto.addEventListener('click', () => {
  closePopup(popupElementPhoto);
});

enableValidation(selectors);

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
  console.log(popupElement);
  popupElement.addEventListener('keydown', function(evt){
    if (evt.key === 'Escape'){
      closePopup(popupElement);
    }
  })
  popupElement.addEventListener('click', (evt) => {
    closePopupByClickOnOverlay(evt, popupElement);
  })
});