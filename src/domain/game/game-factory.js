import { Game } from './game';
import { HumanPlayer } from '../players/human-player';
import { Ship } from '../ship';
import { subscribe } from '../../services/pub-sub';
import { ComputerPlayer } from '../players/computer-player';

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

  createComputerPlayer() {
    this.boardBuilder.reset(this.getShipsCopy());
    this.boardBuilder.placeInRandomPosition();
    return new ComputerPlayer(this.boardBuilder.build());
  }

  create() {
    const playerBoard = this.boardBuilder.build();
    const humanPlayer = new HumanPlayer(playerBoard);
    const computerPlayer = this.createComputerPlayer();
    return new Game([humanPlayer, computerPlayer]);
  }
}

export { GameFactory };
