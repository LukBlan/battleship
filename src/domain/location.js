class Location {
  constructor(coordinates, ship, horizontal) {
    this._coordinates = coordinates;
    this._ship = ship;
    this._horizontal = horizontal;
  }

  get coordinates() {
    return this._coordinates;
  }

  get ship() {
    return this._ship;
  }

  get horizontal() {
    return this._horizontal;
  }
}

export { Location };
