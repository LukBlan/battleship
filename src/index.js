import './styles.css';
import { GameFactory } from './domain/game/game-factory';
import { GameController } from './domain/game/game-controller';
import { GameBoardFactory } from './domain/board/game-board-factory';
import { MenuInterface } from './ui/interfaces/MenuInterface';
import { GameConfigurationInterface } from './ui/interfaces/GameConfigurationInterface';
import { shipElement } from './ui/components/ship-element/ship-element';

const players = [
  { name: 'Player1', size: 10 },
  { name: 'Player2', size: 10 },
];

const ships = [shipElement(3), shipElement(4)];

const gameBoardFactory = new GameBoardFactory();
const gameFactory = new GameFactory();
const game = gameFactory.create(players, gameBoardFactory);
const gameController = new GameController(game);

const gameSection = document.querySelector('.game-section');
const menuInterface = new MenuInterface(gameSection);
const gameConfigurationInterface = new GameConfigurationInterface(gameSection, ships);

gameController.init();
menuInterface.init();
gameConfigurationInterface.init();
