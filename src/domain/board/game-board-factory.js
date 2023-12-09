class GameBoardFactory {
  whiteSpace() {
    return 'x';
  }

  createBoard(size) {
    const board = [];
    for (let i = 0; i < size; i += 1) {
      const row = this.getBoardRow(size);
      board.push(row);
    }

    return board;
  }

  getBoardRow(size) {
    const whiteSpace = this.whiteSpace();
    const boardRow = [];

    for (let i = 0; i < size; i += 1) {
      boardRow.push(whiteSpace);
    }

    return boardRow;
  }
}

export { GameBoardFactory };
