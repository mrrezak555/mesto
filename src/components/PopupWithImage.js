import Popup from "./Popup.js";

export default class PopupWithImage extends Popup{
    constructor(popupSelector){
        super(popupSelector); 
        this._cardImge = this._popupItem.querySelector('.popup__image'); 
        this._cardSubtitle = this._popupItem.querySelector('.popup__subtitle');
    }

    open(data){
        const title = data.name;
        const link = data.link;
        this._cardImge.src = link; 
        this._cardImge.alt = title; 
        this._cardSubtitle.textContent = title; 
        super.open(); 
      }
}