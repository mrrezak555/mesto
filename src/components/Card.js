class Card {

    constructor(data, template, handleCardClick ) {
        this._link = data.link;
        this._name = data.name;
        this._template = template;
        this._handleCardClick = handleCardClick; 
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.grid__item').cloneNode(true);
        return cardElement;
    }

    _likeItem(evt) { 
        this._buttonLike.classList.toggle('grid__like_active'); 
    } 

    _deleteItem() {
        this._element.remove();
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('click', (evt) => { 
            this._likeItem(evt); 
       }); 

        this._element.querySelector('.grid__trash').addEventListener('click', () => {
            this._deleteItem(this._element);
        });

        this._image.addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.grid__image');
        this._buttonLike = this._element.querySelector('.grid__like');
        this._setEventListeners();
        // Добавим данные
        this._image.src = this._link;
        this._element.querySelector('.grid__title').textContent = this._name;
        this._image.alt = this._name;
        // Вернём элемент наружу
        return this._element;
    }

}

export {Card};