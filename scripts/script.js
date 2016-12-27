var gameEngine = {
  board:  Array(7).fill([]),
  player: "b",
  gameOver: false,

  resetGame: function(){
    this.board = Array(7).fill([]);
    this.player = "b";
    this.gameOver = false;

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
      if(!this.board[columnNumber][6]){
        return true;
      }
    }
    return false;
  },

  checkForVictory: function(columnNumber){
    if(this.checkLeft(columnNumber) + this.checkRight(columnNumber) >= 3){
      return true;
    }
    if(this.checkUp(columnNumber) + this.checkRight(columnNumber) >= 3){
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
    for(var i = rowNumber+1; i < this.board[columnNumber].length; i++){
      if(this.board[columnNumber][i] && this.board[columnNumber][i] == this.player){
        sameCount++;
      }
      else{
        break;
      }
    }
    return sameCount;

  },
  makeMove: function(columnNumber){}

}
