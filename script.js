//Bind startGame to start game button
//const startGame = document.querySelector(".start-btn");
//startGame.addEventListener("click", game.startGame);

//Game Module
//Should be able to tell if there has been a win or not
const game = (() => {
  let turn = 0;

  //Function to check if any player won
  const checkWin = (arrBoard) => {
    for (let i = 0; i < 3; i++) {
      let marker = document.querySelector(`#${i}`);
      if (marker.textContent != null) {
        marker = marker.textContent;
      } else {
        marker = "blank";
      }
      if (
        arrBoard[i] == marker &&
        arrBoard[i + 3] == marker &&
        arrBoard[i + 6] == marker
      ) {
        return true;
      }
    }

    for (let i = 0; i < 7; i += 3) {
      let marker = document.querySelector(`#${i}`);
      if (marker.textContent != null) {
        marker = marker.textContent;
      } else {
        marker = "blank";
      }
      if (
        arrBoard[i] == marker &&
        arrBoard[i + 1] == marker &&
        arrBoard[i + 2] == marker
      ) {
        return true;
      }
    }

    let marker0 = document.querySelector("#0");
    if (marker0.textContent != null) {
      marker0 = marker0.textContent;
    } else {
      marker0 = "blank";
    }
    let marker2 = document.querySelector("#2");
    if (marker2.textContent != null) {
      marker2 = marker2.textContent;
    } else {
      marker2 = "blank";
    }
    if (
      arrBoard[0] == marker0 &&
      arrBoard[4] == marker0 &&
      arrBoard[8] == marker0
    ) {
      return true;
    }
    if (
      arrBoard[2] == marker2 &&
      arrBoard[4] == marker2 &&
      arrBoard[6] == marker2
    ) {
      return true;
    }

    return false;
  };

  //function to start game
  //Should create two player instances
  //Should initialize arrBoard and display
  const startGame = () => {
    //1. Initialize player instances with marker X and marker O.
    const player1 = player("X");
    const player2 = player("O");
    const player = [player1, player2];
    //2. Initialize an empty game Board -> fill arrBoard with empty strings and update display.
    gameBoard.initBoard();
    //3. Play game where players take turns clicking grids which will update that grid with their respective marker
    while (!checkWin(gameBoard.getBoard()) || turn > 9) {
      player.makeMove();
    }
  };
})();

//GameBoard Module
const gameBoard = (() => {
  let arrBoard = [];

  //method to initialize arrboard with empty strings
  const initBoard = () => {
    arrBoard = ["", "", "", "", "", "", "", "", ""];
    displayControl.displayGrid();
  };

  //getter for arrBoard
  const getBoard = () => arrBoard;

  //setter for arrBoard
  const setBoard = (index, currPlayer) => {
    arrBoard[index] = currPlayer.getMarker();
  };

  return {
    getBoard,
    setBoard,
    initBoard,
  };
})();

//Display Controller Module
const displayControl = (() => {
  //Function to initialize display
  const init = () => {
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => game.startGame());
    const grids = document.querySelectorAll(".gridSquare");
    grids.forEach((button) =>
      button.addEventListener("click", game.makeMove())
    );
  };

  //function to get the most up to date gameBoard array and then update display with the values
  const displayGrid = () => {
    const currBoard = gameBoard.getBoard();
    for (let i = 0; i < currBoard.length; i++) {
      let currGrid = document.getElementById(`${i}`);
      currGrid.textContent = currBoard[i];
    }
  };

  return { init, displayGrid };
})();

displayControl.init();

//Player factory function
//Should contain method to click on gameboard and place marker
const player = (marker) => {
  const getMarker = () => marker;

  return { getMarker };
};
