class Card {

    constructor(data, myId, template, { handleCardClick, handleDeleteCard, handleAddLike, handleRemoveLike }) {
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._template = template;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;

        this._id = data._id;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._myId = myId;
        this._idOwner = data.owner._id
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._template).content.querySelector('.grid__item').cloneNode(true);
        return cardElement;
    }

    setLikeActive() {
        this._buttonLike.classList.add('grid__like_active');
    }

    setLikeDisable(){
        this._buttonLike.classList.remove('grid__like_active');
    }

    _addLikeButton(evt) {
        if (evt.target.classList.contains('grid__like_active')) {
            this._handleRemoveLike(this._id);
            //this._buttonLike.classList.remove('grid__like_active');
        }
        else {
            this._handleAddLike(this._id);
            //this.setLikeActive();
        }
    }

    deleteItem() {
        this._element.remove();
    }

    _setEventListeners() {
        this._buttonLike.addEventListener('mousedown', (evt) => {
            this._addLikeButton(evt);
        });

        this._element.querySelector('.grid__trash').addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._image.addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    setLikeCount(count) {
        this._element.querySelector('.grid__like-count').textContent = count;
    }


    // Для чужих карточек прячем кнопку
    _hideTrashButton(){
        if (this._myId !== this._idOwner){
            this._buttonTrash.classList.add('grid__trash_hidden');
        }
    }

    _initialCardLike(){
        const isOwnLike = this._likes.some((myLike) => {
            return myLike._id === this._myId;
        })
        if (isOwnLike) {
            this.setLikeActive();
          }
    }

    generateCard() {
        // Запишем разметку в приватное поле _element. 
        // Так у других элементов появится доступ к ней.
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.grid__image');
        this._buttonLike = this._element.querySelector('.grid__like');
        this._buttonTrash = this._element.querySelector('.grid__trash');
        this._hideTrashButton();
        this._initialCardLike();
        this._setEventListeners();
        // Добавим данные
        this._image.src = this._link;
        this._element.querySelector('.grid__title').textContent = this._name;
        this.setLikeCount(this._likes.length);
        this._image.alt = this._name;
        // Вернём элемент наружу
        return this._element;
    }

}

export { Card };