//Bind startGame to start game button
const startGame = document.querySelector(".start-btn");
startGame.addEventListener("click", game.startGame);

//Game Module
//Should be able to tell if there has been a win or not
const game = (() => {
  let turn = 0;

  //Function to check if any player won
  const checkWin = (arrBoard) => {
    /* Winning indices
    0,3,6
    1,4,7
    2,5,8
    0,1,2
    3,4,5
    6,7,8
    0,4,8
    2,4,6
    */

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
  const startGame = () => {
    const player1 = Player("X");
    const player2 = Player("O");
    while (!checkWin(gameBoard.getBoard()) || turn > 9) {
      player.makeMove();
    }
  };
})();

//GameBoard Module
//Should add clickable event for each grid that a player can interact with
//If grid has already been claimed, should prevent player from clicking it again
const gameBoard = (() => {
  let arrBoard = [];
  const getBoard = () => arrBoard;

  const setBoard = (index) => {
    arrBoard.index = currMove();
  };

  return {
    getBoard,
    setBoard,
  };
})();

//Player factory function
//Should contain method to click on gameboard and place marker
const player = (marker) => {
  const marker = marker;

  const makeMove = () => {};
};
