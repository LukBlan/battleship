/* eslint-env jest */
import { GameBoardFactory } from '../../src/board/game-board-factory';

describe('GameBoardFactory class', () => {
  const boardFactory = new GameBoardFactory();

  describe('createBoard', () => {
    const sizeTenBard = boardFactory.createBoard(10);

    it('should create a board with size 10', () => {
      expect(sizeTenBard.length).toBe(10);
    });

    it('initialize all elements of board with white spaces', () => {
      const whiteSpace = boardFactory.whiteSpace();
      expect(sizeTenBard[0][1]).toBe(whiteSpace);
      expect(sizeTenBard[5][0]).toBe(whiteSpace);
      expect(sizeTenBard[9][9]).toBe(whiteSpace);
    });
  });
});
