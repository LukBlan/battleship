import { subscribe } from '../../services/pub-sub';
import { matchSection } from '../components/match-section/match-section';
import { boardGrid } from '../components/board-grid/board-grid';

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
  }

  displayComputerBoard(board) {
    const newBoardElement = boardGrid(board, this.boardFactory);
    const { parentElement } = this.computerBoard;
    parentElement.replaceChild(newBoardElement, this.computerBoard);
  }
}

export { MatchInterface };
