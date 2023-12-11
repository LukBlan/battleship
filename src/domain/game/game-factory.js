import { Game } from './game';
import { HumanPlayer } from '../players/HumanPlayer';
import { GameBoard } from '../board/game-board';

class GameFactory {
  create(playersInfo, gameBoardFactory) {
    const players = playersInfo.forEach((playerInfo) => {
      const playerName = playerInfo.name;
      const boardSize = playerInfo.size;
      const board = new GameBoard(gameBoardFactory, boardSize);
      return new HumanPlayer(playerName, board);
    });

    return new Game(players);
  }
}

export { GameFactory };
