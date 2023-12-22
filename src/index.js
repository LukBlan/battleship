import './styles.css';
import { GameFactory } from './domain/game/game-factory';
import { GameController } from './domain/game/game-controller';
import { MenuInterface } from './ui/interfaces/menu-interface';
import { GameConfigurationInterface } from './ui/interfaces/game-configuration-interface';
import { GameBoardBuilder } from './domain/board/game-board-builder';
import { GameBoardFactory } from './domain/board/game-board-factory';
import { Ship } from './domain/ship';

// Domain dependencies
const ships = [
  new Ship(3), new Ship(4), new Ship(1), new Ship(2), new Ship(3),
];

const boardFactory = new GameBoardFactory();
const boardBuilder = new GameBoardBuilder(boardFactory, 8);
const gameFactory = new GameFactory(boardBuilder, ships);
const gameController = new GameController(gameFactory);

// Ui dependencies
const gameSection = document.querySelector('.game-section');
const menuInterface = new MenuInterface(gameSection);
const configInterface = new GameConfigurationInterface(gameSection, boardFactory);

menuInterface.init();
configInterface.init();
gameController.init();
