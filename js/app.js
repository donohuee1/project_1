///////GLOBAL VARIABLES////////
var cardSuits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']
var value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
//Has to know when a card has been picked and won't call it again since it's only 1 deck
var deck = []

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

/////////HAPPENS IMMEDIATELY////////


//'<img src="playing_cards/card_images/'+this.value+'_of_'+this.cardSuits.toLowerCase()+'.png"/>'



/////////FUNCTIONS///////////////
var Card = function(cardSuits, value) {
  this.cardSuits = cardSuits
  this.value = value
  this.stateValue = function(){
    return 'The ' + this.value + ' of ' + this.cardSuits + '.'
  }
}

//Capital means it's not a normal function and is a blueprint(or constructor)
//Building Deck
for(var i = 0; i < value.length; i++){
  for(var j = 0; j < cardSuits.length; j++){
    var card = new Card(cardSuits[j], value[i])
    deck.push(card)
  }
}

/*Pulling a random card from the deck.  defined my minimum, my maximium, randomly
generated the index number I am targeting in the deck.  Created a new card using
the deck array and the index number I randomly generated. I am then removing that
card from the deck using the splice method so it is not reused.*/

function getCard () {
  var min = Math.ceil(0)
  var max = Math.floor(deck.length - 1)
  var index = Math.floor(Math.random() * (max-min)) + min;
  var newCard = deck[index]
  deck.splice(index, 1)
  return newCard
}

function cardScores(card, player) {//break into player score and dealer score.  Dealer only first value until you hit stay and then add all cards for dealer score.
  var cardval = value.indexOf(card.value) + 2
  if(cardval == 14) {
    cardval = 11//Ace
  } else if(cardval >= 11) {
    cardval = 10//will work for jack, queen, and king
  }
  console.log(cardval)
  player.handTotal = player.handTotal + cardval
}

player.cardArr.push(getCard())//pushing random generated card into player and dealer card arrays
player.cardArr.push(getCard())
dealer.cardArr.push(getCard())
dealer.cardArr.push(getCard())//not calling this card until player hits stay, so it won't show until it's the dealer's turn


cardScores(player.cardArr[0], player)
cardScores(player.cardArr[1], player)//parameter we called earlier in getCard (card, player)
cardScores(dealer.cardArr[0], dealer)//created array in player and dealer objects
//cardScores(dealer.cardArr[1], dealer) - This gets called in the #stay click function

function roundWinner () {
  if(player.handTotal > dealer.handTotal && player.handTotal <= 21) {
    player.moneyScore = player.moneyScore + 100
    var winner = true
    return "player wins"
  } else if(player.handTotal > 21) {
    player.moneyScore = player.moneyScore - 100
    var winner = false
    return "dealer wins"
  } else if(player.handTotal < dealer.handTotal && dealer.handTotal <= 21) {
    player.moneyScore = player.moneyScore - 100
    var winner = false
    return "dealer wins"
  } else if(player.handTotal === dealer.handTotal && dealer.handTotal <= 21 && player.handTotal <= 21) {
    return "It's a tie, no gain or loss"
  } else if(player.handTotal > 21 && dealer.handTotal > 21) {
    player.moneyScore = player.moneyScore - 100
    var winner = false
    return "dealer wins"
  } else if(player.handTotal <= 21 && dealer.handTotal > 21) {
    player.moneyScore = player.moneyScore + 100
    var winner = true
    return "player wins"
  }
  $("#playerscore").html(player.moneyScore)//NOT RETURNING AFTER THE FIRST DEAL. SHOULD NOT DECLARE ROUNDWINNER/MONEY WON UNTIL PLAYER HAS CLICKED STAY
}
//console.log(roundWinner())
console.log("dealer hand =" + dealer.handTotal)
console.log("player hand =" + player.handTotal)

function hitWinLogic(){
  if(player.handTotal > 21) {
    player.moneyScore = player.moneyScore -100
    var winner = false
    return "dealer wins"
    $("#playerscore").html(player.moneyScore)//NOT RETURNING AFTER THE FIRST DEAL. SHOULD NOT DECLARE ROUNDWINNER/MONEY WON UNTIL PLAYER HAS CLICKED STAY
  }
}
/////////////If there's time/////////////
/*function bet() {

}*/

///////////////


$("#hit").click(function(){
   player.cardArr.push(getCard())
   cardScores(player.cardArr[player.cardArr.length - 1], player)
   console.log("player hand =" +player.handTotal)
   console.log("dealer hand =" +dealer.handTotal)
   //console.log(roundWinner())
   console.log(hitWinLogic())
   $("#playerscore").html(player.moneyScore)//NOT RETURNING AFTER THE FIRST DEAL. SHOULD NOT DECLARE ROUNDWINNER/MONEY WON UNTIL PLAYER HAS CLICKED STAY
});

$("#stay").click(function(){
cardScores(dealer.cardArr[1], dealer)
  while(dealer.handTotal < 17) {
    dealer.cardArr.push(getCard())
    cardScores(dealer.cardArr[dealer.cardArr.length - 1], dealer)
    //dealer.handTotal = dealer.handTotal + cardval//doesn't work
  } console.log("dealer hand =" +dealer.handTotal)
    console.log("player hand =" +player.handTotal)
    console.log(roundWinner())
    $("#playerscore").html(player.moneyScore)//NOT RETURNING AFTER THE FIRST DEAL. SHOULD NOT DECLARE ROUNDWINNER/MONEY WON UNTIL PLAYER HAS CLICKED STAY
});
//If I hit stay, forces dealer to draw card

$("#hideRules").click(function(){
  $("#rules").hide();
})

$("#playerscore").html(player.moneyScore)//NOT RETURNING AFTER THE FIRST DEAL. SHOULD NOT DECLARE ROUNDWINNER/MONEY WON UNTIL PLAYER HAS CLICKED STAY
///////////////////////////////////
/*function roundUp() {
    round++; //increments round
    if(winner = true) {
      player.moneyScore++;
      $("#playerscore").html(player.moneyScore);
      $("#roundNumber").html(round);
    } else if(winner = false) {
      player.moneyScore--;
      $("#playerScore").html(player.moneyScore);
      $("#roundNumber").html(round);
    }
}
roundUp();*/

function endRound() {
  deck = []
  for(var i = 0; i < value.length; i++){
    for(var j = 0; j < cardSuits.length; j++){
      var card = new Card(cardSuits[j], value[i])
      deck.push(card)
    }
  }
}

$("#endRoundButton").click(function(){
  endRound()
  player.cardArr = []
  dealer.cardArr = []
  player.cardArr.push(getCard())//pushing random generated card into player and dealer card arrays
  player.cardArr.push(getCard())
  dealer.cardArr.push(getCard())
  dealer.cardArr.push(getCard())//not calling this card until player hits stay, so it won't show until it's the dealer's turn

  player.handTotal = 0
  dealer.handTotal = 0
  cardScores(player.cardArr[0], player)
  cardScores(player.cardArr[1], player)//parameter we called earlier in getCard (card, player)
  cardScores(dealer.cardArr[0], dealer)
  console.log("dealer hand =" + dealer.handTotal)
  console.log("player hand =" + player.handTotal)
  $("#roundNumber").html(++round)
})

function gameWinner() {
  if(player.moneyScore <= 0) {
    alert("dealer wins")
  } else if(player.moneyScore >= 2000) {
    alert("player wins")
  }
}
gameWinner();


function resetRound() {
  location.reload()
}

$("#resetRoundButton").click(function(){
  resetRound()
})

//if card is this suit && value, then show this image.

//2 divs for player and 2 for dealer
