import { gameConfigurationScreen } from '../components/game-configuration-screen/game-configuration-screen';
import { subscribe } from '../../services/pub-sub';
import { boardGrid } from '../components/board-grid/board-grid';
import { shipSection } from '../components/ship-element/ship-element';
import { PlaceShipInterface } from './place-ship-interface';

class GameConfigurationInterface {
  constructor(gameSection, boardFactory) {
    this.gameSection = gameSection;
    this.configurationScreen = gameConfigurationScreen();
    this.boardSection = this.configurationScreen.querySelector('.board');
    this.shipSection = this.configurationScreen.querySelector('.ships-section');
    this.boardFactory = boardFactory;
    this.placeShipInterface = new PlaceShipInterface(this.boardSection);
  }

  init() {
    subscribe('configure-new-game', this.renderGameConfiguration.bind(this));
    subscribe('board-change', this.replaceConfigurationObjects.bind(this));
    this.placeShipInterface.init();
  }

  replaceConfigurationObjects(changeObject) {
    const { board, ships } = changeObject;
    this.replaceBoard(board);
    this.replaceShips(ships);
  }

  replaceBoard(newBoard) {
    const newBoardElement = boardGrid(newBoard, this.boardFactory);
    this.configurationScreen.replaceChild(newBoardElement, this.boardSection);
    this.placeShipInterface.setBoardElement(newBoardElement);
    this.boardSection = newBoardElement;
  }

  replaceShips(ships) {
    const shipsContainerSection = shipSection(ships);
    this.configurationScreen.replaceChild(shipsContainerSection, this.shipSection);
    this.shipSection = shipsContainerSection;
  }

  renderGameConfiguration() {
    this.gameSection.append(this.configurationScreen);
  }
}

export { GameConfigurationInterface };
