import { Game } from './game';
import { HumanPlayer } from '../players/HumanPlayer';
import { Ship } from '../ship';
import { subscribe } from '../../services/pub-sub';

class GameFactory {
  constructor(boardBuilder, initialShips) {
    this.boardBuilder = boardBuilder;
    this.initialShips = initialShips;
  }

  init() {
    subscribe('place-ships-in-random-location', this.placeInRandomPosition.bind(this));
    subscribe('reset-ships', this.reset.bind(this));
    this.boardBuilder.setInitialShips(this.getShipsCopy());
    this.boardBuilder.init();
  }

  placeInRandomPosition() {
    this.reset();
    this.boardBuilder.placeInRandomPosition();
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
