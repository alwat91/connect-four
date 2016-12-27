var gameEngine = {
  board:  Array(7).fill(Array(6).fill(null)),
  player: "b",
  gameOver: false,

  resetGame: function(){
    this.board = Array(7).fill(Array(6).fill(null));
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
  
  checkForVictory: function(position){


  },
  checkLeft: function(position){

  },
  checkRight: function(position){

  },
  checkUp: function(position){},
  checkDown: function(position){},
  makeMove: function(columnNumber){}

}
