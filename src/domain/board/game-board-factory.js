class GameBoardFactory {
  whiteSpace() {
    return '-';
  }

  hitBoardMark() {
    return 'x';
  }

  missBoardMark() {
    return 'o';
  }

  createBoard(size) {
    const board = [];
    for (let i = 0; i < size; i += 1) {
      const row = this.getBoardRow(size);
      board.push(row);
    }

    return board;
  }

  notShipMarks() {
    return [this.whiteSpace(), this.hitBoardMark(), this.missBoardMark()];
  }

  getBoardRow(size) {
    const whiteSpace = this.whiteSpace();
    const boardRow = [];

    for (let i = 0; i < size; i += 1) {
      boardRow.push(whiteSpace);
    }

    return boardRow;
  }

  isMissMark(mark) {
    return this.missBoardMark() === mark;
  }

  isHitMark(mark) {
    return this.hitBoardMark() === mark;
  }

  generateCopy(board) {
    return board.map((row) => [...row]);
  }
}

export { GameBoardFactory };
