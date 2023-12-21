import { Game } from './game';
import { HumanPlayer } from '../players/HumanPlayer';
import { Ship } from '../ship';

class GameFactory {
  constructor(boardBuilder, initialShips) {
    this.boardBuilder = boardBuilder;
    this.initialShips = initialShips;
  }

  init() {
    this.boardBuilder.setInitialShips(this.getShipsCopy());
    this.boardBuilder.init();
  }

  reset() {
    this.boardBuilder.reset(this.getShipsCopy());
  }

  getShipsCopy() {
    return this.initialShips.map((ship) => {
      const shipLength = ship.getLength();
      return new Ship(shipLength);
    });
  }

  create() {
    const playerBoard = this.boardBuilder.build();
    const humanPlayer = new HumanPlayer(playerBoard);
    return new Game([humanPlayer]);
  }
}

export { GameFactory };
