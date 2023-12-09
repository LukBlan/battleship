/* eslint-env jest */
import { GameBoardFactory } from '../../src/domain/board/game-board-factory';

describe('GameBoardFactory class', () => {
  const boardFactory = new GameBoardFactory();

  describe('createBoard', () => {
    const sizeTenBoard = boardFactory.createBoard(10);

    it('should create a board with size 10', () => {
      expect(sizeTenBoard.length).toBe(10);
    });

    it('initialize all elements of board with white spaces', () => {
      const whiteSpace = boardFactory.whiteSpace();
      expect(sizeTenBoard[0][1]).toBe(whiteSpace);
      expect(sizeTenBoard[5][0]).toBe(whiteSpace);
      expect(sizeTenBoard[9][9]).toBe(whiteSpace);
    });
  });
});
