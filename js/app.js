/*
 * Create a list that holds all of your cards
 */
let cardList = document.querySelectorAll(".deck .card");

/*
 * Create a list that holds all the icos of the cards
 */
let cardContentList = document.querySelectorAll(".card i");

/*
 * Create a list of classes for set attribute to the <i> tags
 */
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

 /*
 * Set shuffled classes to <i>, shuffled icons every time
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

/*
 * First shuffling of the contentToShuffle
 */
let shuffleCards = shuffle(contentToShuffle);

/*
 * Set shuffling attributes to the <i>
 */
addShuffleCardContent(shuffleCards);

/*
 * Add event listener to all the cards
 */
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

/*
 * Declarations for add event listener and remove event listener
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

/*
 * Function event separated of the function add event listener, this make possible the remove event listener
 */
function event(){
	displayCardSymbol(this);
	this.removeEventListener("click", event);
	listOpenCards(this);
}

/*
 * Counter of moves of all the cards
 */
let counter = 0;

function movesCounter(){
	const moves = document.querySelector(".moves");
	counter += 1;
	moves.innerHTML = counter;
}

/*
 * Display the icon and change the color of the card when is clicked
 */
function displayCardSymbol(card){
	card.setAttribute("class", "card show open");
	movesCounter();
	if(counter === 1){
		timeCounter();
	}
}

/*
 * List of showed cards and validations
 */
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

/*
 * Add timer
 */
let timer = 1;
let timerCounter = document.querySelector("span .timer");

function timeCounter(){
	window.setInterval(function(){
  		timerCounter.innerHTML = timer;
  		timer++;
	},1000);
};