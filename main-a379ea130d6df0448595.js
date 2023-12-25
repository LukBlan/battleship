(()=>{"use strict";class t{constructor(t){this.players=t,this.turnOrder=0}getCurrentPlayer(){return this.players[this.turnOrder]}getOpponentPlayer(){const t=(this.turnOrder+1)%this.players.length;return this.players[t]}emitBoards(){this.players.forEach((t=>t.emitBoard()))}increaseTurnOrder(){this.turnOrder=(this.turnOrder+1)%this.players.length}}const e={};function i(t,i){void 0===e[t]&&(e[t]=[]),e[t].push(i)}function n(t,i){e[t].forEach((t=>t(i)))}class a{constructor(t){this.board=t}makeMoveTo(t){t.letOpponentAttackBoard()}emitBoard(){n("human-board",this.board.getBoard())}letOpponentAttackBoard(t){this.board.attackWithCoordinates(t),this.emitBoard(),this.board.allShipAreSunk()?n("game-over","You Lose"):n("next-turn",null)}getValidMoves(){return this.board.getValidMoves()}}class s{constructor(t){this.length=t,this.hits=0}getLength(){return this.length}hit(){this.hits+=1}isSunk(){return this.hits>=this.length}}class o{constructor(t){this.board=t,e["attack-computer-board"]=[],i("attack-computer-board",this.receiveAttackCoordinates.bind(this))}makeMoveTo(t){const e=t.getValidMoves(),i=e[this.getRandomIndex(e)];t.letOpponentAttackBoard(i)}getRandomIndex(t){return Math.floor(Math.random()*t.length)}receiveAttackCoordinates(t){this.board.attackWithCoordinates(t),this.emitBoard(),this.board.allShipAreSunk()?n("game-over","You win"):n("next-turn",null)}emitBoard(){n("computer-board",this.board.getHiddenBoard())}letOpponentAttackBoard(){n("active-compute-board-attacks",this.board.getValidMoves())}}function r(){n("place-ships-in-random-location",null)}function c(){n("reset-ships",null)}function h(t){t.target.classList.toggle("hover-effect")}function d(t,e){const i=document.createElement("div");return i.classList.add("cell"),function(t){t.addEventListener("dragenter",h),t.addEventListener("dragleave",h)}(i),e.notShipMarks().includes(t)?e.isMissMark(t)?(i.classList.add("miss-mark"),i.innerText="X"):e.isHitMark(t)&&(i.classList.add("ship-block"),i.classList.add("hit-mark")):i.classList.add("ship-block"),i}function l(t,e){const i=function(t,e){const i=document.createElement("div");i.addEventListener("dragover",(t=>{t.preventDefault()}));const n=t.length;for(let a=0;a<n;a+=1){const s=document.createElement("div");for(let i=0;i<n;i+=1){const n=d(t[a][i],e);s.append(n)}i.append(s)}return i}(t,e);return i.classList.add("board"),i}function u(t){const e=t.clientX,i=t.target.childNodes,a=function(t,e){return Array.from(t).reduce(((t,i)=>{const n=i.getBoundingClientRect(),a=n.x+n.width/2,s=Math.abs(e-a);return i.offset=s,s<t.offset?i:t}),{offset:Number.POSITIVE_INFINITY})}(i,e);n("delta-ship-position",Array.from(i).indexOf(a))}function p(t){const e=t.target.children.length;n("ship-location-coordinates",{coordinates:{xPosition:t.clientX,yPosition:t.clientY},shipLength:e})}function m(t){const e=t.parentElement;return Array.from(e.children).indexOf(t)}function g(t,e){const i=function(t,e){const{xPosition:i}=t,{yPosition:n}=t;return Array.from(e.childNodes).map((t=>Array.from(t.childNodes))).flat().reduce(((t,e)=>{const a=e.getBoundingClientRect(),s=a.y+a.height/2,o=a.x+a.width/2,r=(i-o)**2,c=(n-s)**2,h=Math.sqrt(r+c);return e.distance=h,h<t.distance?e:t}),{distance:Number.POSITIVE_INFINITY})}(t,e),n=m(i);return{row:m(i.parentElement),column:n}}class b{constructor(){this.deltaPosition=null,this.boardElement=null}setDeltaPosition(t){this.deltaPosition=t}setBoardElement(t){t.addEventListener("click",this.rotateShip.bind(this)),this.boardElement=t}rotateShip(t){t.target.classList.contains("ship-block")&&(this.horizontalPosition=!this.horizontalPosition,n("rotate-ship",{column:m(t.target),row:m(t.target.parentElement)}))}init(){i("delta-ship-position",this.setDeltaPosition.bind(this)),i("ship-location-coordinates",this.placeShip.bind(this))}placeShip(t){const e=g(t.coordinates,this.boardElement),{row:i}=e,a=e.column-this.deltaPosition,{shipLength:s}=t;n("place-ship",{row:i,column:a,shipLength:s})}}class S{constructor(t,e,i){this._coordinates=t,this._ship=e,this._horizontal=i}get coordinates(){return this._coordinates}get ship(){return this._ship}get horizontal(){return this._horizontal}}class v{constructor(t,e){this.xPosition=t,this.yPosition=e}getX(){return this.xPosition}getY(){return this.yPosition}}class f{constructor(t,e){this.boardFactory=t,this.board=t.createBoard(e),this.allLocatedShips=new Map,this.shipCount=0,this.size=e}setBoard(t){this.board=t}getHiddenBoard(){const t=this.boardFactory.notShipMarks();return this.board.map((e=>e.map((e=>t.includes(e)?e:this.boardFactory.whiteSpace()))))}getBoard(){return this.board}removeShipFromLocation(t,e,i){const n=this.board[e][i],{coordinates:a,ship:s,horizontal:o}=t;let r=a.getX(),c=a.getY();const h=s.getLength();for(let t=0;t<h;t+=1)this.board[c][r]=this.boardFactory.whiteSpace(),o?r+=1:c+=1;this.allLocatedShips.delete(n)}getLocationObject(t,e){const i=this.board[t][e];return this.allLocatedShips.get(i)}getRotateLocation(t,e,i){const{coordinates:n,ship:a,horizontal:s}=t,o=n.getY(),r=n.getX();return new S(new v(s?i:i-(e-o),s?e-(i-r):e),a,!s)}rotateShip(t,e){const i=this.getLocationObject(t,e),n=this.getRotateLocation(i,t,e);this.removeShipFromLocation(i,t,e),this.placeShip(n)}canRotateShipOnLocation(t,e){const i=this.getLocationObject(t,e),n=new f(this.boardFactory,this.size),a=this.getRotateLocation(i,t,e),s=this.boardFactory.generateCopy(this.board);return n.setBoard(s),n.removeShipFromLocation(i,t,e),n.canPlaceShip(a)}attackWithCoordinates(t){const{row:e,column:i}=t,n=new v(i,e);this.attackPlace(n)}attackPlace(t){const e=t.getX(),i=t.getY(),n=this.board[i][e];let a=this.boardFactory.missBoardMark();if(this.allLocatedShips.has(n)){const t=this.allLocatedShips.get(n),{ship:e}=t;e.hit(),a=this.boardFactory.hitBoardMark()}this.board[i][e]=a}allShipAreSunk(){const t=this.allLocatedShips.values();return Array.from(t).every((t=>{const{ship:e}=t;return e.isSunk()}))}canPlaceShip(t){return this.#t(t)&&this.#e(t)}placeShip(t){const{coordinates:e,ship:i,horizontal:n}=t;let a=e.getX(),s=e.getY();const o=i.getLength(),r=this.shipCount.toString();for(let t=0;t<o;t+=1)this.board[s][a]=r,n?a+=1:s+=1;this.allLocatedShips.set(r,t),this.shipCount+=1}#t(t){const{coordinates:e,ship:i,horizontal:n}=t,a=n?e.getX():e.getY(),s=i.length-1;return a>=0&&a+s<this.size}#e(t){const{coordinates:e,ship:i,horizontal:n}=t,a=i.getLength();let s=e.getX(),o=e.getY(),r=!0;for(let t=0;t<a;t+=1)r=r&&this.emptyLocation(o,s),n?s+=1:o+=1;return r}getValidMoves(){return this.board.map(((t,e)=>t.map(((t,i)=>({column:i,row:e}))))).flat().filter((t=>{const{column:e,row:i}=t,n=this.board[i][e];return n!==this.boardFactory.hitBoardMark()&&n!==this.boardFactory.missBoardMark()}))}emptyLocation(t,e){return this.board[t][e]===this.boardFactory.whiteSpace()}}function B(t,e){const i=document.createElement("div"),n=document.createElement("h3"),a=document.createElement("div");return i.classList.add("player-section"),n.classList.add("player-title"),n.innerText=t,a.classList.add(e),i.append(n),i.append(a),i}const y=[new s(3),new s(4),new s(1),new s(2),new s(3)],L=new class{whiteSpace(){return"-"}hitBoardMark(){return"x"}missBoardMark(){return"o"}createBoard(t){const e=[];for(let i=0;i<t;i+=1){const i=this.getBoardRow(t);e.push(i)}return e}notShipMarks(){return[this.whiteSpace(),this.hitBoardMark(),this.missBoardMark()]}getBoardRow(t){const e=this.whiteSpace(),i=[];for(let n=0;n<t;n+=1)i.push(e);return i}isMissMark(t){return this.missBoardMark()===t}isHitMark(t){return this.hitBoardMark()===t}generateCopy(t){return t.map((t=>[...t]))}},w=document.querySelector(".game-section"),E=new class{constructor(t){this.gameSection=t,this.menuButton=document.querySelector(".menu-button"),this.newGameButton=function(){const t=document.createElement("button");return t.innerText="New Game",t.classList.add("new-game-button"),t.classList.add("option-button"),t}(),this.onClick=this.emitDisplayConfigurationScreen.bind(this)}init(){this.menuButton.addEventListener("click",this.toggleMenuOnScreen.bind(this)),this.toggleMenuOnScreen()}toggleMenuOnScreen(){this.gameSection.contains(this.newGameButton)?(this.newGameButton.removeEventListener("click",this.onClick),this.gameSection.removeChild(this.newGameButton)):(this.gameSection.append(this.newGameButton),this.newGameButton.addEventListener("click",this.onClick))}emitDisplayConfigurationScreen(){this.toggleMenuOnScreen(),n("configure-new-game",null)}}(w),k=new class{constructor(t,e){this.gameSection=t,this.configurationScreen=function(){const t=document.createElement("div"),e=document.createElement("div"),i=document.createElement("h2"),n=document.createElement("div"),a=function(){const t=document.createElement("div"),e=function(){const t=document.createElement("button");return t.innerText="Random",t.classList.add("option-button"),t.addEventListener("click",r),t}(),i=function(){const t=document.createElement("button");return t.innerText="Reset",t.classList.add("option-button"),t.addEventListener("click",c),t}(),n=function(){const t=document.createElement("button");return t.innerText="Start",t.classList.add("option-button"),t.classList.add("deactivate"),t.classList.add("start-game-button"),t}();return t.classList.add("footer"),t.append(e),t.append(i),t.append(n),t}();return e.classList.add("board"),n.classList.add("ships-section"),t.classList.add("configuration-screen"),i.innerText="Arrange your boats",i.classList.add("configuration-title"),t.append(i),t.append(e),t.append(n),t.append(a),t}(),this.boardSection=this.configurationScreen.querySelector(".board"),this.shipSection=this.configurationScreen.querySelector(".ships-section"),this.startGameButton=this.configurationScreen.querySelector(".start-game-button"),this.startGameEventIsActive=!1,this.boardFactory=e,this.placeShipInterface=new b(this.boardSection)}init(){i("configure-new-game",this.renderGameConfiguration.bind(this)),i("board-change",this.replaceBoard.bind(this)),i("ship-change",this.replaceShips.bind(this)),i("all-ships-on-board",this.activeStartGameButton.bind(this)),i("ships-available",this.desactiveStartGameButton.bind(this)),i("start-game",this.removeConfigurationScreen.bind(this)),this.placeShipInterface.init()}activeStartGameButton(){this.startGameEventIsActive||(this.startGameButton.addEventListener("click",this.emitStartGameEvent),this.startGameButton.classList.toggle("deactivate"),this.startGameEventIsActive=!0)}desactiveStartGameButton(){this.startGameEventIsActive&&(this.startGameButton.removeEventListener("click",this.emitStartGameEvent),this.startGameButton.classList.toggle("deactivate"),this.startGameEventIsActive=!1)}emitStartGameEvent(){n("start-game",null)}removeConfigurationScreen(){const{parentElement:t}=this.configurationScreen;t.removeChild(this.configurationScreen)}replaceBoard(t){const e=l(t,this.boardFactory);this.configurationScreen.replaceChild(e,this.boardSection),this.placeShipInterface.setBoardElement(e),this.boardSection=e}replaceShips(t){const e=function(t){const e=document.createElement("div");return e.classList.add("ships-section"),t.forEach((t=>{const i=function(t){const e=function(t){const e=document.createElement("div");e.classList.add("ship"),e.draggable=!0;for(let i=0;i<t;i+=1){const t=document.createElement("div");t.classList.add("ship-block"),e.append(t)}return e}(t);return e.addEventListener("dragstart",u),e.addEventListener("dragend",p),e}(t.getLength());e.append(i)})),e}(t);this.configurationScreen.replaceChild(e,this.shipSection),this.shipSection=e}renderGameConfiguration(){this.gameSection.append(this.configurationScreen)}}(w,L),C=new class{constructor(t,e){this.boardFactory=e,this.gameSection=t,this.matchScreen=null,this.humanBoard=null,this.computerBoard=null,this.gameOverScreen=null}init(){i("start-game",this.displayGameSection.bind(this)),i("computer-board",this.displayComputerBoard.bind(this)),i("human-board",this.displayHumanBoard.bind(this)),i("active-compute-board-attacks",this.activeComputerBoard.bind(this)),i("game-over",this.showResult.bind(this)),i("configure-new-game",this.removeGameScreens.bind(this))}removeGameScreens(){null!==this.gameOverScreen&&(this.gameOverScreen.parentElement.removeChild(this.gameOverScreen),this.gameOverScreen=null),null!==this.matchScreen&&(this.matchScreen.parentElement.removeChild(this.matchScreen),this.matchScreen=null)}activeComputerBoard(t){this.computerBoard.addEventListener("click",(e=>{const i=g({xPosition:e.clientX,yPosition:e.clientY},this.computerBoard),a=i.column,s=i.row;t.some((t=>t.row===s&&t.column===a))&&n("attack-computer-board",i)}))}showResult(t){const e=function(t){const e=document.createElement("div"),i=document.createElement("h3"),n=document.createElement("p");return e.classList.add("game-over-screen"),i.innerText="Game Over",n.innerText=t,e.append(i),e.append(n),e}(t);this.gameSection.append(e),this.gameOverScreen=e}displayGameSection(){this.matchScreen=function(){const t=document.createElement("div"),e=B("Player Board","player-board"),i=B("Computer Board","computer-board");return t.classList.add("match-section"),t.append(e),t.append(i),t}(),this.gameSection.append(this.matchScreen),this.humanBoard=this.gameSection.querySelector(".player-board"),this.computerBoard=this.gameSection.querySelector(".computer-board")}displayHumanBoard(t){const e=l(t,this.boardFactory),{parentElement:i}=this.humanBoard;i.replaceChild(e,this.humanBoard),this.humanBoard=e}displayComputerBoard(t){const e=l(t,this.boardFactory),{parentElement:i}=this.computerBoard;i.replaceChild(e,this.computerBoard),this.computerBoard=e}}(w,L);E.init(),k.init(),C.init();const P=new class{constructor(t,e){this.boardFctory=t,this.size=e,this.board=null,this.availableShips=null}init(){i("place-ship",this.placeShip.bind(this)),i("rotate-ship",this.rotateShip.bind(this))}setInitialShips(t){this.availableShips=t,this.emitEventBasedOnShipsAvailable()}emitEventBasedOnShipsAvailable(){let t="ships-available";0===this.availableShips.length&&(t="all-ships-on-board"),n(t,null)}build(){return this.board}rotateShip(t){const{row:e,column:i}=t;this.board.canRotateShipOnLocation(e,i)&&(this.board.rotateShip(e,i),this.emitBoard())}placeShip(t){const{row:e,column:i,shipLength:n}=t,a=new v(i,e),o=new s(n),r=new S(a,o,!0);this.board.canPlaceShip(r)&&(this.board.placeShip(r),this.removeAvailableShip(o),this.emitBoard(),this.emitShip())}removeAvailableShip(t){const e=this.availableShips.findIndex((e=>e.getLength()===t.getLength())),i=this.availableShips.filter(((t,i)=>e!==i));this.setInitialShips(i)}reset(t){this.board=new f(this.boardFctory,this.size),this.setInitialShips(t),this.emitBoard(),this.emitShip()}placeInRandomPosition(){this.availableShips.forEach((t=>{this.placeShipInRandomPosition(t)})),this.setInitialShips([]),this.emitBoard(),this.emitShip()}placeShipInRandomPosition(t){const e=Math.floor(Math.random()*this.size),i=Math.floor(Math.random()*this.size),n=Math.random()<.5,a=new S(new v(e,i),t,n);this.board.canPlaceShip(a)?this.board.placeShip(a):this.placeShipInRandomPosition(t)}emitBoard(){n("board-change",this.board.getBoard())}emitShip(){n("ship-change",this.availableShips)}}(L,8),M=new class{constructor(t,e){this.boardBuilder=t,this.initialShips=e}init(){i("place-ships-in-random-location",this.placeInRandomPosition.bind(this)),i("reset-ships",this.reset.bind(this)),this.boardBuilder.setInitialShips(this.getShipsCopy()),this.boardBuilder.init()}placeInRandomPosition(){this.reset(),this.boardBuilder.placeInRandomPosition()}reset(){this.boardBuilder.reset(this.getShipsCopy())}getShipsCopy(){return this.initialShips.map((t=>{const e=t.getLength();return new s(e)}))}createComputerPlayer(){return this.boardBuilder.reset(this.getShipsCopy()),this.boardBuilder.placeInRandomPosition(),new o(this.boardBuilder.build())}create(){const e=this.boardBuilder.build(),i=new a(e),n=this.createComputerPlayer();return new t([i,n])}}(P,y),O=new class{constructor(t){this.game=null,this.gameFactory=t}init(){i("configure-new-game",this.newGameConfiguration.bind(this)),i("start-game",this.newGame.bind(this)),i("next-turn",this.nextTurn.bind(this)),this.gameFactory.init()}newGame(){this.game=this.gameFactory.create(),this.game.emitBoards(),this.nextTurn()}nextTurn(){const t=this.game.getCurrentPlayer(),e=this.game.getOpponentPlayer();this.game.increaseTurnOrder(),t.makeMoveTo(e)}newGameConfiguration(){this.gameFactory.reset()}}(M);O.init()})();