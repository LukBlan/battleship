class Ship {
  constructor(length) {
    this.length = length;
    this.hits = length;
    this.sunked = false;
  }

  getLength() {
    return this.length;
  }

  hit() {

  }
}

export { Ship };
