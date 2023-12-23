import { emit } from '../../services/pub-sub';

class HumanPlayer {
  constructor(board) {
    this.board = board;
  }

  makeMoveTo(opponentPlayer) {
    opponentPlayer.letOpponentAttackBoard();
    // emit('make-move-to-computer-player', opponentPlayer);
  }

  emitBoard() {
    emit('human-board', this.board.getBoard());
  }

  letOpponentAttackBoard() {

  }
}

export { HumanPlayer };
