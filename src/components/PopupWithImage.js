import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector); 
        this._cardImge = this._popupItem.querySelector('.popup__image'); 
        this._cardSubtitle = this._popupItem.querySelector('.popup__subtitle');
    }

    open(data){ 
        this._title = data.name; 
        this._link = data.link; 
        this._cardImge.src = this._link; 
        this._cardImge.alt = this._title; 
        this._cardSubtitle.textContent = this._title; 
        super.open(); 
      }
}