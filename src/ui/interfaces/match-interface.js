import { emit, subscribe } from '../../services/pub-sub';
import { matchSection } from '../components/match-section/match-section';
import { boardGrid } from '../components/board-grid/board-grid';
import { getBoardCoordinatesFromClick } from '../../services/board-cordinates-from-click';

class MatchInterface {
  constructor(gameSection, boardFactory) {
    this.boardFactory = boardFactory;
    this.gameSection = gameSection;
    this.matchScreen = null;
    this.humanBoard = null;
    this.computerBoard = null;
  }

  init() {
    subscribe('start-game', this.displayGameSection.bind(this));
    subscribe('computer-board', this.displayComputerBoard.bind(this));
    subscribe('human-board', this.displayHumanBoard.bind(this));
    subscribe('active-compute-board-attacks', this.activeComputerBoard.bind(this));
    subscribe('game-over', this.showResult.bind(this));
  }

  activeComputerBoard(validMoves) {
    this.computerBoard.addEventListener('click', (event) => {
      const xPosition = event.clientX;
      const yPosition = event.clientY;
      const coordinateObject = { xPosition, yPosition };
      const coordinates = getBoardCoordinatesFromClick(coordinateObject, this.computerBoard);
      const columnMove = coordinates.column;
      const rowMove = coordinates.row;

      if (validMoves.some(
        (coordinate) => coordinate.row === rowMove && coordinate.column === columnMove,
      )) {
        emit('attack-computer-board', coordinates);
      }
    });
  }

  showResult() {
    console.log('Game over');
  }

  displayGameSection() {
    this.matchScreen = matchSection();
    this.gameSection.append(this.matchScreen);
    this.humanBoard = this.gameSection.querySelector('.player-board');
    this.computerBoard = this.gameSection.querySelector('.computer-board');
  }

  displayHumanBoard(board) {
    const newBoardElement = boardGrid(board, this.boardFactory);
    const { parentElement } = this.humanBoard;
    parentElement.replaceChild(newBoardElement, this.humanBoard);
    this.humanBoard = newBoardElement;
  }

  displayComputerBoard(board) {
    const newBoardElement = boardGrid(board, this.boardFactory);
    const { parentElement } = this.computerBoard;
    parentElement.replaceChild(newBoardElement, this.computerBoard);
    this.computerBoard = newBoardElement;
  }
}

export { MatchInterface };
