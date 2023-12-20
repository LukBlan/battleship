/* eslint-env jest */
import { GameBoardFactory } from '../../src/domain/board/game-board-factory';
import { Ship } from '../../src/domain/ship';
import { Coordinates } from '../../src/domain/coordinates';
import { GameBoard } from '../../src/domain/board/game-board';
import { Location } from '../../src/domain/location';

describe('GameBoard class', () => {
  const gameBoardFactory = new GameBoardFactory();
  let gameBoard = null;
  const coordinates = new Coordinates(4, 4);
  const ship = new Ship(5);
  const location = new Location(coordinates, ship, true);

  beforeEach(() => {
    gameBoard = new GameBoard(gameBoardFactory, 10);
    jest.clearAllMocks();
  });

  describe('placeShip function', () => {
    it('should place an horizontal ship with length 5 it should take 5 contiguous spot', () => {
      gameBoard.placeShip(location);
      expect(gameBoard.emptyLocation(4, 4)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 5)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 6)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 7)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 8)).toBeFalsy();
    });
  });

  describe('canPlaceShip', () => {
    it('should let you locate a ship if it fit on the board', () => {
      expect(gameBoard.canPlaceShip(location)).toBeTruthy();
    });

    it('should return false when trying to place the same ship in the same coordinates', () => {
      expect(gameBoard.canPlaceShip(location)).toBeTruthy();
      gameBoard.placeShip(location);
      expect(gameBoard.canPlaceShip(location)).toBeFalsy();
    });

    it('should return false when trying to locate a ship on top right corner and horizontally', () => {
      const topRightCorner = new Coordinates(9, 0);
      const cornerLocation = new Location(topRightCorner, ship, true);
      expect(gameBoard.canPlaceShip(cornerLocation)).toBeFalsy();
    });

    it('should return true when trying to locate a ship of size 1 in a corner', () => {
      const corner = new Coordinates(9, 9);
      const sizeOneShip = new Ship(1);
      const cornerLocation = new Location(corner, sizeOneShip, true);
      expect(gameBoard.canPlaceShip(cornerLocation)).toBeTruthy();
    });

    it('should return false then trying to locate a ship on bottom left corner vertically', () => {
      const bottomLeftCorner = new Coordinates(0, 9);
      const leftCornerLocation = new Location(bottomLeftCorner, ship, false);
      expect(gameBoard.canPlaceShip(leftCornerLocation)).toBeFalsy();
    });
  });

  describe('attackPlace', () => {
    it('should hit ship in place', () => {
      const shipSpy = jest.spyOn(Ship.prototype, 'hit').mockImplementationOnce(() => {});
      gameBoard.placeShip(location);
      gameBoard.attackPlace(coordinates);
      expect(shipSpy).toBeCalled();
    });

    it('should mark the grid', () => {
      gameBoard.placeShip(location);
      gameBoard.attackPlace(coordinates);
      expect(gameBoard.emptyLocation(4, 4)).toBeFalsy();
    });

    it('should mark the grid after missing a shot', () => {
      gameBoard.attackPlace(coordinates);
      expect(gameBoard.emptyLocation(4, 4)).toBeFalsy();
    });
  });

  describe('allShipAreSunk', () => {
    it('should return true when all ships are sunk', () => {
      const ship2 = new Ship(3);
      const ship3 = new Ship(1);
      const ship2Location = new Location(coordinates, ship2, true);
      const ship3Location = new Location(new Coordinates(0, 0), ship3, true);
      gameBoard.placeShip(ship2Location);
      gameBoard.placeShip(ship3Location);
      expect(gameBoard.allShipAreSunk()).toBeFalsy();
      ship3.hit();
      ship2.hit();
      ship2.hit();
      ship2.hit();
      expect(gameBoard.allShipAreSunk()).toBeTruthy();
    });
  });

  describe('getLocationObject', () => {
    it('should return the ship located in that coordinates', () => {
      gameBoard.placeShip(location);
      expect(gameBoard.getLocationObject(4, 4)).toBe(location);
    });
  });

  describe('canRotateShipOnLocation', () => {
    beforeEach(() => {
      gameBoard.placeShip(location);
    });

    it('should return false when a ship rotation would locate a ship out of top board', () => {
      gameBoard.placeShip(new Location(new Coordinates(0, 1), new Ship(4), true));
      expect(gameBoard.canRotateShipOnLocation(1, 2)).toBeFalsy();
    });

    it('can rotate a ship in near a corner', () => {
      gameBoard.placeShip(new Location(new Coordinates(0, 1), new Ship(4), true));
      expect(gameBoard.canRotateShipOnLocation(1, 1)).toBeTruthy();
    });

    it('should return true if is the only ship in the board', () => {
      expect(gameBoard.canRotateShipOnLocation(4, 5)).toBeTruthy();
    });

    it('should return false if there already a ship in the rotate position', () => {
      const shipInRotatePosition = new Ship(3);
      gameBoard.placeShip(new Location(new Coordinates(3, 3), shipInRotatePosition, true));
      expect(gameBoard.canRotateShipOnLocation(4, 5)).toBeFalsy();
    });

    it('should not affect the current board', () => {
      gameBoard.canRotateShipOnLocation(4, 5);
      expect(gameBoard.emptyLocation(4, 4)).toBeFalsy();
    });
  });

  describe('rotateShip', () => {
    beforeEach(() => {
      gameBoard.placeShip(location);
      gameBoard.rotateShip(4, 5);
    });

    it('should rotate a ship and remove marks from new free spaces', () => {
      expect(gameBoard.emptyLocation(4, 4)).toBeTruthy();
      expect(gameBoard.emptyLocation(4, 6)).toBeTruthy();
      expect(gameBoard.emptyLocation(4, 7)).toBeTruthy();
    });

    it('should place new marks in ship new place', () => {
      expect(gameBoard.emptyLocation(3, 5)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 5)).toBeFalsy();
      expect(gameBoard.emptyLocation(5, 5)).toBeFalsy();
      expect(gameBoard.emptyLocation(6, 5)).toBeFalsy();
      expect(gameBoard.emptyLocation(7, 5)).toBeFalsy();
    });
  });
});
