import './styles.css';
import { GameFactory } from './domain/game/game-factory';
import { GameController } from './domain/game/game-controller';
import { GameBoardFactory } from './domain/board/game-board-factory';
import { WebInterface } from './ui/web-interface';

const players = [
  { name: 'Player1', size: 10 },
  { name: 'Player2', size: 10 },
];

const gameBoardFactory = new GameBoardFactory();
const gameFactory = new GameFactory();
const game = gameFactory.create(players, gameBoardFactory);
const gameController = new GameController(game);

const webInterface = new WebInterface();

gameController.init();
webInterface.init();
