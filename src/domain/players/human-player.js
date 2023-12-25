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

  letOpponentAttackBoard(randomCoordinate) {
    this.board.attackWithCoordinates(randomCoordinate);
    this.emitBoard();

    if (this.board.allShipAreSunk()) {
      emit('game-over', 'You Lose');
    } else {
      emit('next-turn', null);
    }
  }

  getValidMoves() {
    return this.board.getValidMoves();
  }
}

export { HumanPlayer };
