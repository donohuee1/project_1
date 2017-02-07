///////GLOBAL VARIABLES////////
console.log("connected")

var cardSuits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']
var value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
//Has to know when a card has been picked and won't call it again since it's only 1 deck
var deck = []


/////////HAPPENS IMMEDIATELY////////





/////////FUNCTIONS///////////////
var Card = function(cardSuits, value) {
  this.cardSuits = cardSuits
  this.value = value
  this.stateValue = function(){
    return 'The ' + this.value + ' of ' + this.cardSuits + '.'
  }
}//Capital means it's not a normal function and is a blueprint(or constructor)


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

playerCard1 = getCard()
playerCard2 = getCard()

function playerCardScores() {
  return card1 + card2
}

function dealerCardScores() {

}

//if card is this suit && value, then show this image.
