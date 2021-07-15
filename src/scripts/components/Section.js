export class Section {
    constructor({ items, renderer }, sectionElements) {
        this._items = items;
        this._renderer = renderer;
        this._sectionElements = sectionElements;
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item))
    }

    addItem(cardElement) {
        document.querySelector(this._sectionElements).append(cardElement);
    }
}