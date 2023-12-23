import { emit } from '../../services/pub-sub';

class HumanPlayer {
  constructor(board) {
    this.board = board;
  }

  emitBoard() {
    emit('human-board', this.board.getBoard());
  }
}

export { HumanPlayer };
