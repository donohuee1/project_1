///////GLOBAL VARIABLES////////
var cardSuits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']
var value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king', 'ace']
//Has to know when a card has been picked and won't call it again since it's only 1 deck
var deck = []
var cardCounterPlayer = 0;

var cardCounterDealer = 0;

var player = {
  displayName: "Player",
  moneyScore: 1000,
  scoreBoard: $('#playerscore'),
  handTotal: 0,
  cardArr: [] //when you press hit, you push a getCard into the array for playerCards
}

var dealer = {
  displayName: "Dealer",
  moneyScore: 1000,
  scoreBoard: $('#dealerscore'),
  handTotal: 0,
  cardArr: []
}

var round = 1

var winner = true


/////////FUNCTIONS///////////////
var Card = function(cardSuits, value) {
  this.cardSuits = cardSuits
  this.value = value
  this.stateValue = function() {
    return 'The ' + this.value + ' of ' + this.cardSuits + '.'
  }
}

//Capital means it's not a normal function and is a blueprint(or constructor)
//Building Deck
for (var i = 0; i < value.length; i++) {
  for (var j = 0; j < cardSuits.length; j++) {
    var card = new Card(cardSuits[j], value[i])
    deck.push(card)
  }
}


/*Pulling a random card from the deck.  defined my minimum, my maximium, randomly
generated the index number I am targeting in the deck.  Created a new card using
the deck array and the index number I randomly generated. I am then removing that
card from the deck using the splice method so it is not reused.*/

function getCard() {
  var min = Math.ceil(0)
  var max = Math.floor(deck.length - 1)
  var index = Math.floor(Math.random() * (max - min)) + min;
  var newCard = deck[index]
  deck.splice(index, 1)
  return newCard
}

function cardScores(card, player) { //break into player score and dealer score.  Dealer only first value until you hit stay and then add all cards for dealer score.
  var cardval = value.indexOf(card.value) + 2
  if (cardval == 14) {
    cardval = 11 //Ace
  } else if (cardval >= 11) {
    cardval = 10 //will work for jack, queen, and king
  }
  console.log(cardval) //want cardval to link up with a card image
  $("#playerHandScore").html(player.handTotal)
  $("#dealerHandScore").html(dealer.handTotal)
  player.handTotal = player.handTotal + cardval
}

player.cardArr.push(getCard()) //pushing random generated card into player and dealer card arrays
player.cardArr.push(getCard())
dealer.cardArr.push(getCard())
//dealer.cardArr.push(getCard())//not calling this card until player hits stay, so it won't show until it's the dealer's turn


cardScores(player.cardArr[0], player)
cardScores(player.cardArr[1], player) //parameter we called earlier in getCard (card, player)
cardScores(dealer.cardArr[0], dealer) //created array in player and dealer objects
//cardScores(dealer.cardArr[1], dealer) - This gets called in the #stay click function

function dealCards() {
  $("#playerCard1").html("<img src='assets/playing_card_images/" +
    player.cardArr[0].value + "_of_" + player.cardArr[0].cardSuits.toLowerCase() + ".png'/>")

  $("#playerCard2").html("<img src='assets/playing_card_images/" +
    player.cardArr[1].value + "_of_" + player.cardArr[1].cardSuits.toLowerCase() + ".png'/>")

  $("#dealerCard1").html("<img src='assets/playing_card_images/" +
    dealer.cardArr[0].value + "_of_" + dealer.cardArr[0].cardSuits.toLowerCase() + ".png'/>")

  cardCounterPlayer = 3;

  cardCounterDealer = 2;

  $("#hit").click(function() {
    player.cardArr.push(getCard())
    cardScores(player.cardArr[player.cardArr.length - 1], player)
    console.log("player hand =" + player.handTotal)
    console.log("dealer hand =" + dealer.handTotal)
    //console.log(roundWinner())
    console.log(hitWinLogic())
    $("#playerscore").html(player.moneyScore)
    $("#playerHandScore").html(player.handTotal)
    $("#dealerHandScore").html(dealer.handTotal)
    $("#playerCard" + cardCounterPlayer).html("<img src='assets/playing_card_images/" +
      player.cardArr[player.cardArr.length - 1].value + "_of_" + player.cardArr[player.cardArr.length - 1].cardSuits.toLowerCase() + ".png'/>")
    cardCounterPlayer++;
    gameWinner();
  });

  $("#stay").click(function() {
    //cardScores(dealer.cardArr[0], dealer)//originally 1
    while (dealer.handTotal < 17) {
      dealer.cardArr.push(getCard())
      console.log(dealer.cardArr)
      cardScores(dealer.cardArr[dealer.cardArr.length - 1], dealer)
      $("#dealerCard" + cardCounterDealer).html("<img src='assets/playing_card_images/" +
        dealer.cardArr[dealer.cardArr.length - 1].value + "_of_" + dealer.cardArr[dealer.cardArr.length - 1].cardSuits.toLowerCase() + ".png'/>")
      cardCounterDealer++;
      //dealer.handTotal = dealer.handTotal + cardval
    }
    console.log("dealer hand =" + dealer.handTotal)
    console.log("player hand =" + player.handTotal)
    roundWinner()
    $("#playerHandScore").html(player.handTotal)
    $("#dealerHandScore").html(dealer.handTotal)
    $("#playerscore").html(player.moneyScore)
    //$("#hit").off()
    gameWinner();
  });
}
dealCards()

function roundWinner() {
  if (player.handTotal > dealer.handTotal && player.handTotal <= 21) {
    player.moneyScore = player.moneyScore + 100
    var winner = true
    console.log("player wins")
    $("#openModal").html("Player wins this round! | +$100 | Click 'END ROUND' next.")
    //alert ("Player wins this round! Click 'end round' next.")
    modal.css("display", "block");
  } else if (player.handTotal > 21) {
    player.moneyScore = player.moneyScore - 100
    var winner = false
    console.log("dealer wins")
    $("#openModal").html("Dealer wins this round! | -$100 | Click 'END ROUND' next.")
    //alert ("Dealer wins this round! Click 'end round' next.")
    modal.css("display", "block");
  } else if (player.handTotal < dealer.handTotal && dealer.handTotal <= 21) {
    player.moneyScore = player.moneyScore - 100
    var winner = false
    console.log("dealer wins")
    $("#openModal").html("Dealer wins this round! | -$100 | Click 'END ROUND' next.")
    //alert ("Dealer wins this round! Click 'end round' next.")
    modal.css("display", "block");
  } else if (player.handTotal === dealer.handTotal && dealer.handTotal <= 21 && player.handTotal <= 21) {
    console.log("It's a tie, no gain or loss")
    $("#openModal").html("This round is a tie! Click 'END ROUND' next.")
    //alert ("This round is a tie! Click 'end round' next.")
    modal.css("display", "block");
  } else if (player.handTotal > 21 && dealer.handTotal > 21) {
    player.moneyScore = player.moneyScore - 100
    var winner = false
    console.log("dealer wins")
    $("#openModal").html("Dealer wins this round! | -$100 | Click 'END ROUND' next.")
    //alert ("Dealer wins this round! Click 'end round' next.")
    modal.css("display", "block");
  } else if (player.handTotal <= 21 && dealer.handTotal > 21) {
    player.moneyScore = player.moneyScore + 100
    var winner = true
    console.log("player wins")
    $("#openModal").html("Player wins this round! | +$100 | Click 'END ROUND' next.")
    //alert ("Player wins this round! Click 'end round' next.")
    modal.css("display", "block");
  }
  $("#playerscore").html(player.moneyScore)
  $("#hit").off()
  $("#stay").off() //if there's a winner, cannot click
}
//console.log(roundWinner())
console.log("dealer hand =" + dealer.handTotal)
console.log("player hand =" + player.handTotal)
$("#playerHandScore").html(player.handTotal)
$("#dealerHandScore").html(dealer.handTotal)

function hitWinLogic() {
  if (player.handTotal > 21) {
    player.moneyScore = player.moneyScore - 100
    var winner = false
    $("#playerscore").html(player.moneyScore)
    $("#hit").off()
    $("#stay").off() //if there's a winner, cannot click
    console.log("dealer wins")
    $("#openModal").html("Dealer wins this round! | -$100 | Click 'END ROUND' next.")
    //alert ("Dealer wins this round! Click 'end round' next.")
    modal.css("display", "block");
  }
}
/////////////If there's time/////////////
/*function bet() {

}*/

///////////////



//If I hit stay, forces dealer to draw card

$("#hideRules").click(function() {
  $("#rules").hide();
})

$("#playerscore").html(player.moneyScore)
///////////////////////////////////


function endRound() {
  deck = []
  for (var i = 0; i < value.length; i++) {
    for (var j = 0; j < cardSuits.length; j++) {
      var card = new Card(cardSuits[j], value[i])
      deck.push(card)
    }
  }
}

$("#endRoundButton").click(function() {
  endRound()

  player.cardArr = []
  dealer.cardArr = []

  player.cardArr.push(getCard()) //pushing random generated card into player and dealer card arrays
  player.cardArr.push(getCard())
  dealer.cardArr.push(getCard())
  dealer.cardArr.push(getCard()) //not calling this card until player hits stay, so it won't show until it's the dealer's turn

  player.handTotal = 0
  dealer.handTotal = 0
  cardScores(player.cardArr[0], player)
  cardScores(player.cardArr[1], player) //parameter we called earlier in getCard (card, player)
  cardScores(dealer.cardArr[0], dealer)
  console.log("dealer hand =" + dealer.handTotal)
  console.log("player hand =" + player.handTotal)
  $("#roundNumber").html(++round)
  $("#dealerHandScore").html(dealer.handTotal)
  $("#playerHandScore").html(player.handTotal)
  $(".cardsPlayer, .cardsDealer").empty()
  dealCards()
})

function gameWinner() {
  console.log("player bust")
  if (player.moneyScore <= 0) {
    //alert("dealer wins")
    $("#openModal").html("Sorry, you're out of money...just like real life! Dealer won this game, but click 'NEW GAME' to play again")
  } else if (player.moneyScore >= 2000) {
    //alert("player wins")
    $("#openModal").html("You better go to Vegas, because you just won! Click 'NEW GAME' to play again")
  }
}


function resetGame() {
  location.reload()
  playerHandScore = 0
  dealerHandScore = 0
}

$("#newGameButton").click(function() {
  resetGame()
})

///////////////////////////////////////////////////////////
// Get the modal
var modal = $('#myModal');


// Closes the modal
$(".close").click(function() {
    modal.css("display", "none");
})
