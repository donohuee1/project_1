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


/////////HAPPENS IMMEDIATELY////////





/////////FUNCTIONS///////////////
var Card = function(cardSuits, value) {
  this.cardSuits = cardSuits
  this.value = value
  this.stateValue = function(){
    return 'The ' + this.value + ' of ' + this.cardSuits + '.'
  }
}

//Capital means it's not a normal function and is a blueprint(or constructor)
for(var i = 0; i < value.length; i++){
  for(var j = 0; j < cardSuits.length; j++){
    var card = new Card(cardSuits[j], value[i])
    deck.push(card)
  }
}

document.getElementById('showdeck').addEventListener('click', function() {
  console.log(deck)
  console.log(deck.length)
})


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

function cardScores(card, player) {
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
dealer.cardArr.push(getCard())


cardScores(player.cardArr[0], player)
cardScores(player.cardArr[1], player)//parameter we called earlier in getCard (card, player)
cardScores(dealer.cardArr[0], dealer)//created array in player and dealer objects
cardScores(dealer.cardArr[1], dealer)

function roundWinner () {
  if(player.handTotal > dealer.handTotal && player.handTotal <= 21) {
    return "player wins this round!"
  } else if(player.handTotal > 21) {
    return "dealer wins"
  } else if(player.handTotal < dealer.handTotal && dealer.handTotal <= 21) {
    return "dealer wins"
  } else if(player.handTotal === dealer.handTotal && dealer.hantotal <= 21 && player.handTotal <= 21) {
    return "It's a tie, no gain or loss"
  } else if(player.hantotal > 21 && dealer.handTotal > 21) {
    return "dealer wins"
  }
}
console.log(roundWinner())
console.log("dealer hand =" + dealer.handTotal)
console.log("player hand =" +player.handTotal)

//function hit () {
  //playerCard(x) = getCard()
//}

$("#hit").click(function(){
   player.cardArr.push(getCard())
   cardScores(player.cardArr[player.cardArr.length - 1], player)
   console.log(player.handTotal)
});


//if card is this suit && value, then show this image.
