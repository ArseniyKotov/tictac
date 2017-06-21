const prompt = require('prompt');

var Game = function() {
  this.board = [['', '', ''], ['', '', ''], ['', '', '']];
  this.player1 = 'X';
  this.player2 = 'O';
  this.nextRound(this.player1);
};

Game.prototype.displayBoard = function() {
  this.board.forEach(function(element) {
    console.log(element);
  });
};

Game.prototype.nextRound = function(player) {
  console.log(`Yo fam AKA ${player} its your turn. Go for it`);
  this.displayBoard();
  this.getPlayerInput(player);
};

Game.prototype.getPlayerInput = function(player) {
  // give the player a prompt
  prompt.start();
  prompt.get(['row', 'column'], (err, move) => {
    if (err) {
      // cant do much here
      console.log('There was an error with your move', err);
    } else {
      // check if the move is valid
      if (this.checkValidMove(move)) {
        // if its valid then place the piece that the player represents in that spot on the board
        this.placeMove(player, move);
        // check if game is over
        if (this.checkForWin(player)) {
          // if its over then show the board and let the player know they won
          this.displayBoard();
          console.log(player + ' won! woot woot');
          // reset the board for the next game
          this.board = [['', '', ''], ['', '', ''], ['', '', '']];
          // winners start
          this.nextRound(player);
        } else {
          // switch players and getPlayerInput with the other player now
          if (player === this.player1) {
            this.nextRound(this.player2);
          } else {
            this.nextRound(this.player1);
          }
        }
      } else {
        console.log('That was not a valid move.');
        this.getPlayerInput(player);
      }
    }
  });
};

Game.prototype.checkValidMove = function(move) {
  if (this.board[move.row][move.column] === '') {
    return true;
  } else {
    return false;
  }
};

Game.prototype.placeMove = function(player, move) {
  this.board[move.row][move.column] = player;
};

Game.prototype.checkForWin = function(player) {
  
  // check for player win rows
  var counter = 0;
  for (let i = 0; i < 3; i ++) {
    for (let k = 0; k < 3; k++) {
      if (this.board[i][k] === player) {
        counter++;
      }
    }
    if (counter === 3) {
      return true;
    } else {
      counter = 0;
    }
  }

  // check player cols
  var counter = 0;
  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
      if (this.board[k][i] === player) {
        counter++;
      }
    }
    if (counter === 3) {
      return true;
    } else {
      counter = 0;
    }
  }

  // check player left diag
  var counter = 0;
  for (let i = 0, k = 0; i < 3, k < 3; i++, k++) {
    if (this.board[i][k] === player) {
      counter++;
    }
  }
  if (counter === 3) {
    return true; 
  }
  
  // check player right diag
  var counter = 0;
  for (let i = 2, k = 2; i > 0, k > 0; i--, k--) {
    if (this.board[i][k] === player) {
      counter++;
    }
  }
  if (counter === 3) {
    return true;
  } else {
    return false;
  }
  // check for each player
  // check if we have row wins
  // check if we have column wins
  // check if we have left diagonal win
  // check if we have right diagonal win
};

const game = new Game();