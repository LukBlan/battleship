import { emit } from '../../services/pub-sub';

class ComputerPlayer {
  constructor(board) {
    this.board = board;
  }

  emitBoard() {
    emit('computer-board', this.board.getHiddenBoard());
  }
}

export { ComputerPlayer };
