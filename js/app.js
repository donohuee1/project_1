///////GLOBAL VARIABLES////////
console.log("connected")

var cardSuits = ['Spades', 'Hearts', 'Clubs', 'Diamonds']
var value = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
//Has to know when a card has been picked and won't call it again since it's only 1 deck
var deck = []

/*var randomNumber =

x = 1, y = 10
Math.floor(Math.random() * ((10-1)+1) + 1);*/


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

/*function playerCardScores() {
   var card1 = Math.floor(Math.random() * 10 + 1);
   var card2 = Math.floor(Math.random() * 10 + 1);
   return (card1 + card2);
           }

//splice lets you take from middle.  push it into players hand and Splice will change the contents of the deck array so you are not reusing cards.

getCard function = {
deck.splice
}

function getCard (1, 51) {
  min = Math.ceil(1);
  max = Math.floor(51);
  return Math.floor(Math.random() * (deck.length - 1)) + 1;
}

//if card is this suit && value, then show this image.*/
