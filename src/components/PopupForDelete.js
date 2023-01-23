import Popup from "./Popup.js";


export default class PopupForDelete extends Popup {
    constructor(popupSelector, deleteCallback) {
        super(popupSelector);
        this.deleteButton = this._popupItem.querySelector(".popup__submit");
        this._callback = deleteCallback;
    }

    setEventListeners() {
        super.setEventListeners();
        this.deleteButton.addEventListener("mousedown", () => {
            this._callback();
        })
    }

    getCard(cardToDelete) {
        this.card = cardToDelete;
    }
}