//Game Module
const game = (() => {
  let turn = 0;

  //Function check
  const checkWin = (arrBoard) =>
  { 

  }
  //function to start game
  const startGame = () => {
    while(checkWin(gameBoard.getBoard())){


    }
  }
  
})();

//GameBoard Module
const gameBoard = (() => {
  let arrBoard = [];
  const getBoard = () => arrBoard;
  
  const setBoard = (index) => {
    arrBoard.index = currMove();
  }

  const currMove = turn => turn % 2 == 0 ? "X" : "O";
  
  return{
    getBoard,
    setBoard
  }
})();

//Player factory function
//Should contain method to click on gameboard and place marker
const player = () => {

  const makeMove;

};
