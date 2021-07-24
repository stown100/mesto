export class Section {
    constructor({ items, renderer }, sectionElements, api) {
        this._items = items;
        this._renderer = renderer;
        this._sectionElements = sectionElements;
        this._api = api;
    }

    renderItems() {
        this._items.forEach(item => this._renderer(item))
    }

    addItem(cardElement) {
        document.querySelector(this._sectionElements).append(cardElement);
    }

    saveItem = (data) => {
        this._api
        .addTask(data)
        .then((res) => {
            this.addItem(res.name)
        })
    }
}