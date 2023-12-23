import { gameConfigurationScreen } from '../components/game-configuration-screen/game-configuration-screen';
import { emit, subscribe } from '../../services/pub-sub';
import { boardGrid } from '../components/board-grid/board-grid';
import { shipSection } from '../components/ship-element/ship-element';
import { PlaceShipInterface } from './place-ship-interface';

class GameConfigurationInterface {
  constructor(gameSection, boardFactory) {
    this.gameSection = gameSection;
    this.configurationScreen = gameConfigurationScreen();
    this.boardSection = this.configurationScreen.querySelector('.board');
    this.shipSection = this.configurationScreen.querySelector('.ships-section');
    this.startGameButton = this.configurationScreen.querySelector('.start-game-button');
    this.startGameEventIsActive = false;
    this.boardFactory = boardFactory;
    this.placeShipInterface = new PlaceShipInterface(this.boardSection);
  }

  init() {
    subscribe('configure-new-game', this.renderGameConfiguration.bind(this));
    subscribe('board-change', this.replaceBoard.bind(this));
    subscribe('ship-change', this.replaceShips.bind(this));
    subscribe('all-ships-on-board', this.activeStartGameButton.bind(this));
    subscribe('ships-available', this.desactiveStartGameButton.bind(this));
    subscribe('start-game', this.removeConfigurationScreen.bind(this));
    this.placeShipInterface.init();
  }

  activeStartGameButton() {
    if (!this.startGameEventIsActive) {
      this.startGameButton.addEventListener('click', this.emitStartGameEvent);
      this.startGameButton.classList.toggle('deactivate');
      this.startGameEventIsActive = true;
    }
  }

  desactiveStartGameButton() {
    if (this.startGameEventIsActive) {
      this.startGameButton.removeEventListener('click', this.emitStartGameEvent);
      this.startGameButton.classList.toggle('deactivate');
      this.startGameEventIsActive = false;
    }
  }

  emitStartGameEvent() {
    emit('start-game', null);
  }

  removeConfigurationScreen() {
    const { parentElement } = this.configurationScreen;
    parentElement.removeChild(this.configurationScreen);
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
