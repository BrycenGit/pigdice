class Game {
  constructor() {
    this.playersArray = [];
    this.playersIndex = 0;
  }

  addPlayerToTheGame(playerToAdd) {
    this.playersArray.push(playerToAdd)
  }
  
  nextPlayer() {
    if (this.playersIndex + 1 < this.playersArray.length) {
      this.playersIndex++;
    } else {
      this.playersIndex = 0;
    }
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.rollAmount = 0;
  }

  roll() {
    let roll = Math.ceil(Math.random() * 6);
    if (roll > 1) {
      alert(roll)
      this.rollAmount += roll;
    } else {
      this.rollAmount = 0;
      alert('1 next player')
      this.hold(pigDice);
    }
    return this.rollAmount
  }
  
  hold(currentGame) {
    this.score += this.rollAmount;
    this.rollAmount = 0;
    currentGame.nextPlayer();
  }
}



$(document).ready(function() {
  let pigDice = new Game();
  $('form#playerNames').submit(function(event) {
    event.preventDefault();
    const inputtedPlayer1 = $('input#player1Name').val()
    const inputtedPlayer2 = $('input#player2Name').val()
    let newPlayer = new Player(inputtedPlayer1);
    let newPlayer2 = new Player(inputtedPlayer2);
    pigDice.addPlayerToTheGame(newPlayer);
    pigDice.addPlayerToTheGame(newPlayer2);
    $('#rollOrHold').show();
    $('#playerNames').show();
    $('.name1').text(inputtedPlayer1);
    $('.name2').text(inputtedPlayer2);
  })
  $('#roll').click(function() {
    pigDice.playersArray[pigDice.playersIndex].roll();
    $('#rollAmount1').text(pigDice.playersArray[0].rollAmount);
    $('#rollAmount2').text(pigDice.playersArray[1].rollAmount);
  })
  $('#hold').click(function() {
    pigDice.playersArray[pigDice.playersIndex].hold(pigDice);
    $('#scorePlayer1').text(pigDice.playersArray[0].score);
    $('#scorePlayer2').text(pigDice.playersArray[1].score);
  })
})