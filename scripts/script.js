var gameEngine = {
  board:  [[], [], [], [], [], [], []],
  player: "b",
  gameOver: false,

  resetGame: function(){
    this.board = [[], [], [], [], [], [], []];
    this.player = "b";
    this.gameOver = false;
    viewEngine.clearFlash();

  },

  togglePlayer: function(){
    if(this.player == "r"){
      this.player = "b";
    }
    else{
      this.player = "r";
    }

  },

  isValidMove: function(columnNumber){
    if(!this.gameOver){
      if(!this.board[columnNumber] || this.board[columnNumber].length < 6){
        viewEngine.clearFlash();
        return true;
      }
      viewEngine.flashMessage("Please choose a column that isn't full.");
      return false;
    }
    if(this.player == "r"){
      viewEngine.flashMessage("The red player has won!");
    }
    else{
      viewEngine.flashMessage("The black player has won!");
    }
    return false;
  },

  checkForVictory: function(columnNumber){
    if(this.checkLeft(columnNumber) + this.checkRight(columnNumber) >= 3){
      return true;
    }
    if(this.checkDown(columnNumber)  >= 3){
      return true;
    }
    return false;

  },
  checkLeft: function(columnNumber){
    var sameCount = 0;
    var rowNumber = this.board[columnNumber].length-1;
    for(var i = columnNumber-1; i >= 0; i--){
      if(this.board[i][rowNumber] && this.board[i][rowNumber] == this.player){
        sameCount++;
      }
      else{
        break;
      }
    }
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

  checkDiag: function(columnNumber){
    var sameCount = 0;
    var rowNumber = this.board[columnNumber].length-1;
    for(var i = columnNumber-1; i >= 0; i--){
      if(this.board[i][rowNumber] && this.board[i][rowNumber] == this.player){
        sameCount++;
      }
      else{
        break;
      }
    }
    return sameCount;
  },

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

  }
}

window.onload = function(){
  $('#new-game').on('click', gameController.onClickNewGame);
  $('.play-button').on('click', gameController.onClickDropPiece)

}
