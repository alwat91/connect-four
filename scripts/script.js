var gameEngine = {
  // Establish board as an empty 2D array
  board:  [[], [], [], [], [], [], []],
  // First player is black
  player: "b",
  gameOver: false,

  resetGame: function(){
    // Reset board, player, and gameOver to their original value
    this.board = [[], [], [], [], [], [], []];
    this.player = "b";
    this.gameOver = false;
    // Clear any messages
    viewEngine.clearFlash();

  },

  togglePlayer: function(){
    //Change r to b
    if(this.player == "r"){
      this.player = "b";
    }
    // Change b to r
    else{
      this.player = "r";
    }

  },

  isValidMove: function(columnNumber){
    // Check to see if the game is over.
    if(!this.gameOver){
      // Check to see if either columnNumber is undefined (the empty state) or if it isn't full
      if(!this.board[columnNumber] || this.board[columnNumber].length < 6){
        // clear any invalid move messages
        viewEngine.clearFlash();
        // Returns true if space is valid and game isn't over
        return true;
      }
      // Returns false and displays msg if the game isn't over, but space isn't valid (ie is full)
      viewEngine.flashMessage("Please choose a column that isn't full.");
      return false;
    }
    //Move is invalid if game is over
    return false;
  },

  checkForVictory: function(columnNumber){
    // Victory if the sum of left continuous pieces and right continuous pieces is >= 3 (3 not four because the current piece needs counting)
    if(this.checkLeft(columnNumber) + this.checkRight(columnNumber) >= 3){
      return true;
    }
    // Victory if the sum of continuous pieces below is >= 3
    if(this.checkDown(columnNumber)  >= 3){
      return true;
    }
    // If niether victory condition is met
    return false;

  },
  checkLeft: function(columnNumber){
    var sameCount = 0;
    // Row number on the board is the length of the current column array since new pieces are pushed to the array
    var rowNumber = this.board[columnNumber].length-1;
    // Iterate to the left on the board
    for(var i = columnNumber-1; i >= 0; i--){
      // Check to see if the space being compared is defined and equals the current play
      if(this.board[i][rowNumber] && this.board[i][rowNumber] == this.player){
        // Counts each time a matching piece is found
        sameCount++;
      }
      else{
        // Quit the loop if the piece isn't matching
        break;
      }
    }
    // Returns the number of same pieces to the left
    return sameCount;
  },
  checkRight: function(columnNumber){
    var sameCount = 0;
    var rowNumber = this.board[columnNumber].length-1;
    for(var i = columnNumber+1; i < this.board.length; i++){
      if(this.board[i][rowNumber] && this.board[i][rowNumber] == this.player){
        sameCount++;
      }
      else{
        break;
      }
    }
    return sameCount;
  },

  checkDown: function(columnNumber){
    var sameCount = 0;
    var rowNumber = this.board[columnNumber].length-1;
    for(var i = rowNumber-1; i >= 0; i--){
      if(this.board[columnNumber][i] && this.board[columnNumber][i] == this.player){
        sameCount++;
      }
      else{
        break;
      }
    }
    return sameCount;

  },

  // checkDiag: function(columnNumber){
  //   var sameCount = 0;
  //   var rowNumber = this.board[columnNumber].length-1;
  //   for(var i = columnNumber-1; i >= 0; i--){
  //     if(this.board[i][rowNumber] && this.board[i][rowNumber] == this.player){
  //       sameCount++;
  //     }
  //     else{
  //       break;
  //     }
  //   }
  //   return sameCount;
  // },

  makeMove: function(columnNumber){
    if(this.isValidMove(columnNumber)){
      this.board[columnNumber].push(this.player);
      if(this.checkForVictory(columnNumber)){
        this.gameOver = true;
      }
      else{
        this.togglePlayer();
      }
      return true;
    }
    return false;
  }

}

var viewEngine = {
  refreshBoardView: function(){
    for(var i = 0; i < gameEngine.board.length; i++){
      for(var j = 0; j < 6; j++){
        if(gameEngine.board[i][j] == "b"){
          $('.board').children().eq(i).children().eq(Math.abs(j-6)).html("<div class='black-piece'></div>");
        }
        else if(gameEngine.board[i][j] == "r"){
          $('.board').children().eq(i).children().eq(Math.abs(j-6)).html("<div class='red-piece'></div>");
        }
        else{
          $('.board').children().eq(i).children().eq(Math.abs(j-6)).html("");
        }
      }
    }
  },

  flashMessage: function(message){
    $('.flash-msg').html(message).css('display', 'block');
  },

  clearFlash: function(){
    $('.flash-msg').html('').css('display', 'none');
  }
}

var gameController = {
  onClickNewGame: function(){
    gameEngine.resetGame();
    viewEngine.refreshBoardView();

  },

  onClickDropPiece: function(columnNumber){
    var columnNumber = $(this).attr('data-columns');
    var isValidMove = gameEngine.makeMove(columnNumber-1);
    viewEngine.refreshBoardView();
    if(gameEngine.gameOver){
      if(this.player == "r"){
        viewEngine.flashMessage("The red player has won!");
      }
      else{
        viewEngine.flashMessage("The black player has won!");
      }
    }

  }
}

window.onload = function(){
  $('#new-game').on('click', gameController.onClickNewGame);
  $('.play-button').on('click', gameController.onClickDropPiece)

}
