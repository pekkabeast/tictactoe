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

  //Function to start game
  //Should create two player instances
  //Should initialize arrBoard and display
  const startGame = (player1, player2) => {
    //1. Initialize player instances with marker X and marker O.
    turn = 0;
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

    /*
    Test:
    0 8 6 2 4 5
    0 8 6 4 2 5 3
    */
    const makeMove = (event, player) => {
      turn += 1;
      console.log("turn" + turn);
      event.target.textContent = player.marker;
      console.log("marker" + player.marker + " " + event.target.id);
      gameBoard.setBoard(event.target.id, player);

      event.target.removeEventListener("click", handler);
      if (__checkWin(gameBoard.getBoard())) {
        __endGame(player.name, handler);
      } else if (turn >= 9) {
        __draw(handler);
      }
    };

    //Add event listeners to each grid.
    const grids = document.querySelectorAll(".gridSquare");
    grids.forEach((button) => button.addEventListener("click", handler));
  };

  const __draw = (handler) => {
    const h1winner = document.querySelector(".winner");
    h1winner.textContent = "Draw!";
    const grids = document.querySelectorAll(".gridSquare");
    grids.forEach((button) => button.removeEventListener("click", handler));

    const endOverlay = document.querySelector(".end-overlay");
    endOverlay.style.display = "flex";
  };

  const __endGame = (name, handler) => {
    const h1winner = document.querySelector(".winner");
    h1winner.textContent = `Player ${name} wins!`;

    const grids = document.querySelectorAll(".gridSquare");
    grids.forEach((button) => button.removeEventListener("click", handler));

    const endOverlay = document.querySelector(".end-overlay");
    endOverlay.style.display = "flex";
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
    startBtn.addEventListener("click", () => showForm());
    startBtn.addEventListener("click", removeOverlay);

    //Allow restart button to reset grid and play again
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener("click", () => {
      console.log("reset");
      const player1name = document.getElementById("player1-name");
      const player2name = document.getElementById("player2-name");
      const player1 = player("X", player1name.getAttribute("data-name"));
      const player2 = player("O", player2name.getAttribute("data-name"));
      game.startGame(player1, player2);
    });
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

  const showForm = () => {
    const namesFormWrapper = document.querySelector(".playernames");
    namesFormWrapper.classList.toggle("no-overlay");

    const addNames = (event) => {
      namesFormWrapper.classList.add("no-overlay");
      console.log(namesFormWrapper);
      const player1 = player("X", document.getElementById("player1").value);
      const player2 = player("O", document.getElementById("player2").value);

      const player1name = document.getElementById("player1-name");
      const player2name = document.getElementById("player2-name");

      player1name.textContent = `Player ${player1.name}: X`;
      player1name.setAttribute("data-name", player1.name);
      player2name.setAttribute("data-name", player2.name);
      player2name.textContent = `Player ${player2.name}: O`;
      event.preventDefault();
      game.startGame(player1, player2);
      event.target.reset();
    };

    const namesForm = document.getElementById("nameSubmission");
    namesForm.addEventListener("submit", addNames);
  };

  return { init, displayGrid, showForm };
})();

displayControl.init();

//Player factory function
//Should contain method to click on gameboard and place marker
const player = (marker, name) => {
  return { marker, name };
};
