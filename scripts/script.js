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
    // if(player == "r"){
    //   player
    // }

  },

  isValidMove: function(){


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
