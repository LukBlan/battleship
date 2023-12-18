import { gameConfigurationScreen } from '../components/game-configuration-screen/game-configuration-screen';
import { subscribe } from '../../services/pub-sub';
import { boardGrid } from '../components/board-grid/board-grid';
import { PlaceShipInterface } from './place-ship-interface';

class GameConfigurationInterface {
  constructor(gameSection, ships, boardFactory) {
    this.gameSection = gameSection;
    this.ships = ships;
    this.configurationScreen = gameConfigurationScreen(this.ships);
    this.boardSection = this.configurationScreen.querySelector('.board');
    this.boardFactory = boardFactory;
    this.placeShipInterface = new PlaceShipInterface(this.boardSection);
  }

  init() {
    subscribe('configure-new-game', this.renderGameConfiguration.bind(this));
    subscribe('board-change', this.replaceBoard.bind(this));
    this.placeShipInterface.init();
  }

  replaceBoard(newBoard) {
    const newBoardElement = boardGrid(newBoard, this.boardFactory);
    this.configurationScreen.replaceChild(newBoardElement, this.boardSection);
    this.placeShipInterface.setBoardElement(newBoardElement);
    this.boardSection = newBoardElement;
  }

  renderGameConfiguration() {
    this.gameSection.append(this.configurationScreen);
  }
}

export { GameConfigurationInterface };
