import { emit, subscribe } from '../../services/pub-sub';

class ComputerPlayer {
  constructor(board) {
    this.board = board;
    subscribe('attack-computer-board', this.receiveAttackCoordinates.bind(this));
  }

  makeMoveTo(opponentPlayer) {
    console.log('Computer Move');
  }

  receiveAttackCoordinates(coordinates) {
    this.board.attackWithCoordinates(coordinates);
    this.emitBoard();
  }

  emitBoard() {
    emit('computer-board', this.board.getHiddenBoard());
  }

  letOpponentAttackBoard() {
    emit('active-compute-board-attacks', null);
  }
}

export { ComputerPlayer };
