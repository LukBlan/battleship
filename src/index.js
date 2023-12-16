import './styles.css';
import { GameFactory } from './domain/game/game-factory';
import { GameController } from './domain/game/game-controller';
import { MenuInterface } from './ui/interfaces/MenuInterface';
import { GameConfigurationInterface } from './ui/interfaces/GameConfigurationInterface';
import { shipElement } from './ui/components/ship-element/ship-element';
import { GameBoardBuilder } from './domain/board/game-board-builder';
import { GameBoardFactory } from './domain/board/game-board-factory';

const ships = [
  shipElement(3), shipElement(4), shipElement(1), shipElement(2), shipElement(3),
];

const boardFactory = new GameBoardFactory();
const boardBuilder = new GameBoardBuilder(boardFactory, 10);
const gameFactory = new GameFactory(boardBuilder);
const gameController = new GameController(gameFactory);

const gameSection = document.querySelector('.game-section');
const menuInterface = new MenuInterface(gameSection);
const gameConfigurationInterface = new GameConfigurationInterface(gameSection, ships, 10);

menuInterface.init();
gameConfigurationInterface.init();
gameController.init();
