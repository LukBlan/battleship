import { emit, reset, subscribe } from '../../services/pub-sub';

class ComputerPlayer {
  constructor(board) {
    this.board = board;
    reset('attack-computer-board');
    subscribe('attack-computer-board', this.receiveAttackCoordinates.bind(this));
  }

  makeMoveTo(opponentPlayer) {
    const validMoves = opponentPlayer.getValidMoves();
    const randomIndex = this.getRandomIndex(validMoves);
    const randomCoordinate = validMoves[randomIndex];
    opponentPlayer.letOpponentAttackBoard(randomCoordinate);
  }

  getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  receiveAttackCoordinates(coordinates) {
    this.board.attackWithCoordinates(coordinates);
    this.emitBoard();

    if (this.board.allShipAreSunk()) {
      emit('game-over', 'You win');
    } else {
      emit('next-turn', null);
    }
  }

  emitBoard() {
    emit('computer-board', this.board.getHiddenBoard());
  }

  letOpponentAttackBoard() {
    const validMoves = this.board.getValidMoves();
    emit('active-compute-board-attacks', validMoves);
  }
}

export { ComputerPlayer };
