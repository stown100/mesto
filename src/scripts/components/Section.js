export class Section {
    constructor({ items, renderer }, sectionElement) {
        this._items = items;
        this._renderer = renderer;
        this._sectionElement = sectionElement;
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item))
    }

    addItem(cardElement) {
        this._sectionElement.prepend(cardElement);
    }
}