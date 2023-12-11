/* eslint-env jest */

import { Ship } from '../src/domain/ship';

describe('', () => {
  const ship = new Ship(3);

  it('should be sunk after receive an amount of hits equals of his length', () => {
    expect(ship.isSunk()).toBeFalsy();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  });
});
