/*
 * Create a list that holds all of your cards
 */
let cardList = document.querySelectorAll(".card");

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
    //Validation to block the cards when match
    if(cardList[i].className != "card show open match animated rubberBand block"){
  		  addEvent(cardList[i]);
      }
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
const moves = document.querySelector(".moves");

function movesCounter(){
	counter += 1;
	moves.innerHTML = counter;
  	valorateStars();
}

/*
 * Display the icon and change the color of the card when is clicked
 */
function displayCardSymbol(card){
	card.setAttribute("class", "card show open animated bounceIn");
	if(!oneTime){
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
  		movesCounter();
  		cardsMatch(openList);
  	}

  	if(openList[1] != undefined && openList[0].innerHTML != openList[1].innerHTML){
  		movesCounter();
  		cardsDoNotMatch(openList);
  	}
}

let matchesCards = 0;

function cardsMatch(array){
      //Block the cards when match
  		openList[0].setAttribute("class", "card show open match animated flipOut block");
  		openList[1].setAttribute("class", "card show open match animated flipOut block");
  		openList = [];
  		matchesCards += 1;
  		checkEndGame();
}

function cardsDoNotMatch(array){
		removeEventListener();
      setTimeout(function(){
  		openList[0].setAttribute("class", "card show nomatch animated shake");
  		openList[1].setAttribute("class", "card show nomatch animated shake");
      }, 200);
  		setTimeout(function(){
  		 	openList[0].setAttribute("class", "card animated flipInY");
  			openList[1].setAttribute("class", "card animated flipInY");
  			openList = [];
  			addEventListener();
  		}, 700);
}

/*
 * Add timer
 */
let timerCounter = document.querySelector(".timer");
let oneTime = false;
let timerToStop;
let timer = 1;

function timeCounter(){
	oneTime = true;
    timer = 1;
	  timerToStop = setInterval(function(){
    		timerCounter.innerHTML = timer;
    		timer++;
	  },1000);
};

/*
 * Stars by moves, less or equal than 16 moves 3 stars, more than 16 and less or equal than 24 moves 2 stars, more than 24 moves 1 star.
 */
const stars = document.querySelectorAll(".stars i");

function valorateStars(){
		if(counter <= 16){
			return 3;
		}

		if(counter > 16 && counter <= 24){
			stars[2].setAttribute("class", "fa fa-star-o");
			return 2;
		}
		if(counter > 24){
			stars[1].setAttribute("class", "fa fa-star-o");
			return 1;
		}
}

/*
 * Check end game
 */
 function checkEndGame(){
 	//Neened at least 8 movements for finish the game
 	if(counter >= 8 && matchesCards === 8){
 		congrats();
 	}
 }

/*
  * Function to reset the game
  */
const restart = document.querySelector(".fa-repeat");
restart.addEventListener("click", function(){
  reset();
});

function reset(){
  oneTime = false;
  clearInterval(timerToStop);
  timerCounter.innerHTML = 0;
  shuffle(contentToShuffle);
  addShuffleCardContent(shuffleCards);
  counter = 0;
  moves.innerHTML = counter;
  matchesCards = 0;
  for (let i = 0; i< 3; i++) {
    stars[i].setAttribute("class", "fa fa-star");
  }
  for (let i = 0; i< 16; i++) {
    cardList[i].setAttribute("class", "card");
  }
  openList = [];
  addEventListener();
}

/*
 * End game alert
 */
const playAgain = document.querySelector(".play-again");

function congrats(){
  setTimeout(function(){
    const modal = document.querySelector(".modal-finish");
    modal.style.display = "block";

    const modalContent = document.querySelector(".modal-content");
    modalContent.setAttribute("class", "modal-content animated bounceIn")

    const lastTimer = document.querySelector(".last-timer");
    lastTimer.innerHTML = timer;

    const lastMoves = document.querySelector(".last-moves");
    lastMoves.innerHTML = counter;

    let numberOfStars = valorateStars();
    const lastStars = document.querySelector(".last-stars");
    lastStars.innerHTML = numberOfStars;

    playAgain.addEventListener("click", function(){
      reset();
    })
  }, 1000);
}
