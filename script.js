//Bind startGame to start game button
//const startGame = document.querySelector(".start-btn");
//startGame.addEventListener("click", game.startGame);

//Game Module
//Should be able to tell if there has been a win or not
const game = (() => {
  let turn = 0;

  //Helper function to check if any player won
  const __checkWin = (arrBoard) => {
    //Check columns
    for (let i = 0; i < 3; i++) {
      let marker = document.getElementById(`${i}`);
      if (marker.textContent != null && marker.textContent != "") {
        marker = marker.textContent;
      } else {
        marker = "blank";
      }

      if (
        arrBoard[i] == marker &&
        arrBoard[i + 3] == marker &&
        arrBoard[i + 6] == marker
      ) {
        console.log(1);
        return true;
      }
    }

    //Check rows
    for (let i = 0; i < 7; i += 3) {
      let marker = document.getElementById(`${i}`);
      if (marker.textContent != null && marker.textContent != "") {
        marker = marker.textContent;
      } else {
        marker = "blank";
      }
      if (
        arrBoard[i] == marker &&
        arrBoard[i + 1] == marker &&
        arrBoard[i + 2] == marker
      ) {
        console.log(2);
        return true;
      }
    }

    let marker0 = document.getElementById("0");
    if (marker0.textContent != null && marker0.textContent != "") {
      marker0 = marker0.textContent;
    } else {
      marker0 = "blank";
    }
    let marker2 = document.getElementById("2");
    if (marker2.textContent != null && marker2.textContent != "") {
      marker2 = marker2.textContent;
    } else {
      marker2 = "blank";
    }
    if (
      arrBoard[0] == marker0 &&
      arrBoard[4] == marker0 &&
      arrBoard[8] == marker0
    ) {
      console.log(3);
      return true;
    }
    if (
      arrBoard[2] == marker2 &&
      arrBoard[4] == marker2 &&
      arrBoard[6] == marker2
    ) {
      console.log(4);
      return true;
    }

    return false;
  };

  //Function to start game
  //Should create two player instances
  //Should initialize arrBoard and display
  const startGame = () => {
    //1. Initialize player instances with marker X and marker O.
    const player1 = player("X");
    const player2 = player("O");
    const playerArr = [player1, player2];
    //2. Initialize an empty game Board -> fill arrBoard with empty strings and update display.
    gameBoard.initBoard();

    //3. Start playing game
    __playGame(playerArr);
  };

  //function to play game
  const __playGame = (playerArr) => {
    //Helper function when a player clicks a grid will change the textContent and then disable click on the same grid after.
    const handler = (event) => {
      if (turn % 2 == 0) {
        makeMove(event, playerArr[0]);
      } else {
        makeMove(event, playerArr[1]);
      }
    };

    const makeMove = (event, player) => {
      console.log(event.target);
      turn += 1;
      event.target.textContent = player.marker;
      console.log(event.target.id);
      gameBoard.setBoard(event.target.id, player);

      event.target.removeEventListener("click", handler);
      if (__checkWin(gameBoard.getBoard())) {
        __endGame(player.name);
      }
    };

    //Add event listeners to each grid.
    const grids = document.querySelectorAll(".gridSquare");
    grids.forEach((button) => button.addEventListener("click", handler));
  };

  const __endGame = () => {
    const endOverlay = document.querySelector(".end-overlay");
    endOverlay.style.display = "flex";
    turn = 0;
  };
  return { startGame };
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
    arrBoard[index] = currPlayer.marker;
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
    const removeOverlay = () => {
      const overlay = document.querySelector(".blur-overlay");
      overlay.classList.add("no-overlay");
    };

    const removeEndOverlay = () => {
      const overlay = document.querySelector(".end-overlay");
      overlay.style.display = "none";
    };
    //Allow start button to reset grid and start game
    const startBtn = document.getElementById("start-btn");
    startBtn.addEventListener("click", () => game.startGame());
    startBtn.addEventListener("click", removeOverlay);

    //Allow restart button to reset grid and play again
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener("click", () => game.startGame());
    restartBtn.addEventListener("click", removeEndOverlay);
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
const player = (marker, name) => {
  return { marker, name };
};
