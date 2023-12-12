import { newGameScreen } from './components/new-game-screen';

class WebInterface {
  constructor() {
    this.newGameScree = newGameScreen();
  }

  init() {
    this.showNewGameScreen();
  }

  showNewGameScreen() {
    document.body.append(this.newGameScree);
  }
}

export { WebInterface };
