const gameContainer = document.getElementById("game");
const randomColorsEffect = setInterval(randomEffect,1000);
let bestScore ;
let score = 0;
let matchingPairCount = 0;
let isplaying = false;

let scoreTextField = document.querySelector(".score");
let bestTextField = document.querySelector(".best");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "gold",
  "gold",
  "brown",
  "brown",
  "cyan",
 "cyan",
  "DimGray",
  "DimGray",
  "Wheat",
  "Wheat"
];

let choiceOne;
let choiceTwo;
let delay = false;

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
  
  scoreTextField.textContent = 0;
  bestTextField.textContent = bestScore? bestScore: "-"; 
}

//initializes the game 
function init(){
  score = 0;
  matchingPairCount=0;
  scoreTextField.textContent = 0;
  bestScore = localStorage.getItem("best")
  bestTextField.textContent = bestScore? bestScore: "-"; 

  shuffledColors = shuffle(COLORS);
  document.querySelector("#game").innerHTML = "";
  createDivsForColors(shuffledColors);
  
}

//resets the chosen cards
function resetChoices()
{
  choiceOne.style.backgroundColor ="";
  choiceTwo.style.backgroundColor ="";
  choiceTwo = null;
  choiceOne = null;
  delay = false;
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  if(delay) return;

  //before the game offically start ignore button presses
  if(isplaying === false) return;

  //The first card is chosen
  if(!choiceOne) 
  {
    choiceOne = event.target;
    choiceOne.style.backgroundColor = choiceOne.classList[0];
  }
  else
  {
    //ignore clicks on the first choice
    if(choiceOne === event.target)
      return;

    score++;
    scoreTextField.textContent = score;
    choiceTwo = event.target;
    choiceTwo.style.backgroundColor = choiceTwo.classList[0];

    delay = true;

    //Matching colors
    if(choiceOne.classList[0] == choiceTwo.classList[0])
    {
      matchingPairCount++;
      choiceOne.removeEventListener("click", handleCardClick);
      choiceTwo.removeEventListener("click", handleCardClick);
      choiceTwo = null;
      choiceOne = null;
      delay = false;
    }  
    else{
    setTimeout(resetChoices, 1000);
    }
    
    if(matchingPairCount === COLORS.length/2)
    {
      setTimeout(alert,500,"You Win!")
      if (score < bestScore  || !bestScore){
          localStorage.setItem("best", score);
        }
        button.value = "Play Again?"
    }  
  }
}
// when the DOM loads

//randomize colors before game
function randomEffect()
{
  init();
  cards = document.querySelectorAll("#game div");
  for(let card of cards)
  {
    card.style.backgroundColor = card.classList[0];
  }
}
 
init();

let button = document.querySelector("#start-button")
button.addEventListener("click", function() {
  clearInterval(randomColorsEffect);
  button.value = "Reset?";
  isplaying = true;
  init();
});

