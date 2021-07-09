export class Section {
    constructor( {items, renderer}, sectionElements ) {
        this._items = items;
        this._renderer = renderer;
        this._sectionElements = sectionElements;
    }
    renderer() {
        this._items.forEach(item => this._renderer(item))
    }
    addItem(element) {
        document.querySelector(this._sectionElements).append(element);
    }
}