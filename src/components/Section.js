export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderer() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }

    getSectionCards(cards) {
        this._renderedItems = cards;
    }

    addItem(element) {
        //console.log(this._container);
        this._container.prepend(element);
    }
}