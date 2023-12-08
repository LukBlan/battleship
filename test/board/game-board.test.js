/* eslint-env jest */
import { GameBoard } from '../../src/board/game-board';
import { GameBoardFactory } from '../../src/board/game-board-factory';
import { Ship } from '../../src/ship';

describe('GameBoard class', () => {
  const gameBoardFactory = new GameBoardFactory();
  const gameBoard = new GameBoard(gameBoardFactory);

  describe('placeShip function', () => {
    const ship = new Ship(5);
    const coordinates = new Coordinates(4, 4);

    it('should place a ship in a determined location', () => {
    });
  });
});
