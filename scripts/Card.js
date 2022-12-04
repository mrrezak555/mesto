//Фото попап
const popupElementPhoto = document.querySelector('#photoPopup');
const popupImage = popupElementPhoto.querySelector('.popup__image');
const popupSubtitle = popupElementPhoto.querySelector('.popup__subtitle');

import {openPopup} from "./index.js"; 

class Card {
    static gridElement = document.querySelector('.grid');

    constructor(data, template) {
        this._link = data.link;
        this._name = data.name;
        this._template = template;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.grid__item').cloneNode(true);
        return cardElement;
    }

    _likeItem(evt) {
        evt.target.classList.toggle('grid__like_active');
    }

    _deleteItem(elementCard) {
        elementCard.remove();
    }

    _setPopupPhotoValue() {
        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupSubtitle.textContent = this._name;
    }

    _setEventListeners() {
        this._element.querySelector('.grid__like').addEventListener('click', (evt) => {
            this._likeItem(evt);
        });

        this._element.querySelector('.grid__trash').addEventListener('click', () => {
            this._deleteItem(this._element);
        });

        this._element.querySelector('.grid__image').addEventListener('click', () => {
            this._setPopupPhotoValue();
            openPopup(popupElementPhoto);
        });
    }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._setEventListeners();
        // Добавим данные
        this._element.querySelector('.grid__image').src = this._link;
        this._element.querySelector('.grid__title').textContent = this._name;
        this._element.querySelector('.grid__title').alt = this._name;
        // Вернём элемент наружу
        return this._element;
    }

}

export {Card};