/* eslint-env jest */
import { GameBoardFactory } from '../../src/domain/board/game-board-factory';
import { Ship } from '../../src/domain/ship';
import { Coordinates } from '../../src/domain/coordinates';
import { GameBoard } from '../../src/domain/board/game-board';

describe('GameBoard class', () => {
  const gameBoardFactory = new GameBoardFactory();
  let gameBoard = null;
  const coordinates = new Coordinates(4, 4);
  const ship = new Ship(5);

  beforeEach(() => {
    gameBoard = new GameBoard(gameBoardFactory, 10);
    jest.clearAllMocks();
  });

  describe('placeShip function', () => {
    it('should place an horizontal ship with length 5 it should take 5 contiguous spot', () => {
      gameBoard.placeShip(ship, coordinates, true);
      expect(gameBoard.emptyLocation(4, 4)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 5)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 6)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 7)).toBeFalsy();
      expect(gameBoard.emptyLocation(4, 8)).toBeFalsy();
    });
  });

  describe('canPlaceShip', () => {
    it('should let you locate a ship if it fit on the board', () => {
      expect(gameBoard.canPlaceShip(coordinates, ship, true)).toBeTruthy();
    });

    it('should return false when trying to place the same ship in the same coordinates', () => {
      expect(gameBoard.canPlaceShip(coordinates, ship, true)).toBeTruthy();
      gameBoard.placeShip(ship, coordinates, true);
      expect(gameBoard.canPlaceShip(coordinates, ship, true)).toBeFalsy();
    });

    it('should return false when trying to locate a ship on top right corner and horizontally', () => {
      const topRightCorner = new Coordinates(9, 0);
      expect(gameBoard.canPlaceShip(topRightCorner, ship, true)).toBeFalsy();
    });

    it('should return true when trying to locate a ship of size 1 in a corner', () => {
      const corner = new Coordinates(9, 9);
      const sizeOneShip = new Ship(1);
      expect(gameBoard.canPlaceShip(corner, sizeOneShip, true)).toBeTruthy();
    });

    it('should return false then trying to locate a ship on bottom left corner vertically', () => {
      const bottomLeftCorner = new Coordinates(0, 9);
      expect(gameBoard.canPlaceShip(bottomLeftCorner, ship, false)).toBeFalsy();
    });
  });

  describe('attackPlace', () => {
    it('should hit ship in place', () => {
      const shipSpy = jest.spyOn(Ship.prototype, 'hit').mockImplementationOnce(() => {});
      gameBoard.placeShip(ship, coordinates, true);
      gameBoard.attackPlace(coordinates);
      expect(shipSpy).toBeCalled();
    });

    it('should mark the grid', () => {
      gameBoard.placeShip(ship, coordinates, true);
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
      gameBoard.placeShip(ship2, coordinates, true);
      gameBoard.placeShip(ship3, new Coordinates(0, 0), true);
      expect(gameBoard.allShipAreSunk()).toBeFalsy();
      ship3.hit();
      ship2.hit();
      ship2.hit();
      ship2.hit();
      expect(gameBoard.allShipAreSunk()).toBeTruthy();
    });
  });
});
