/*
 * Create a list that holds all of your cards
 */

let cardList = document.querySelectorAll(".deck .card");
let cardContentList = document.querySelectorAll(".card i");
const contentToShuffle = [
'fa fa-diamond',
'fa fa-diamond',
'fa fa-paper-plane-o',
'fa fa-paper-plane-o',
'fa fa-anchor',
'fa fa-anchor',
'fa fa-bolt',
'fa fa-bolt',
'fa fa-cube',
'fa fa-cube',
'fa fa-leaf',
'fa fa-leaf',
'fa fa-bicycle',
'fa fa-bicycle',
'fa fa-bomb',
'fa fa-bomb']

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function addShuffleCardContent(array){
	for (let i = 0; i < 16; i++){
		cardContentList[i].setAttribute('class', array[i]);
	}
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*Initial settings*/
let shuffleCards = shuffle(contentToShuffle);
addShuffleCardContent(shuffleCards);
addEventListener();



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function addEventListener(){
	for (let i = 0; i< 16; i++) {
  		addEvent(cardList[i]);
  	}
}

function removeEventListener(){
	for (let i = 0; i< 16; i++) {
  		removeEvent(cardList[i]);
  	}
}

function addEvent(card){
	card.addEventListener("click", event);
}

function removeEvent(card){
	card.removeEventListener("click", event);
}

function event(){
	displayCardSymbol(this);
	this.removeEventListener("click", event);
	listOpenCards(this);
}

let counter = 0;

function movesCounter(){
	const moves = document.querySelector(".moves");
	counter += 1;
	moves.innerHTML = counter;
}

function displayCardSymbol(card){
	card.setAttribute("class", "card show open");
	movesCounter();
}

let openList = [];

function listOpenCards(card){
	openList.push(card);

  	if(openList[1] != undefined && openList[0].innerHTML === openList[1].innerHTML){
  		cardsMatch(openList);
  	}

  	if(openList[1] != undefined && openList[0].innerHTML != openList[1].innerHTML){
  		cardsDoNotMatch(openList);
  	}
}

function cardsMatch(array){
  		openList[0].setAttribute("class", "card show open match");
  		openList[1].setAttribute("class", "card show open match");
  		openList = [];
}

function cardsDoNotMatch(array){
		removeEventListener();
  		openList[0].setAttribute("class", "card show nomatch");
  		openList[1].setAttribute("class", "card show nomatch");
  		setTimeout(function(){
  		 	openList[0].setAttribute("class", "card");
  			openList[1].setAttribute("class", "card");
  			openList = [];
  			addEventListener();
  		}, 1000);

}