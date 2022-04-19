const choices = ["fire", "wood", "water", "metal", "earth"];
let highScoreStorage = localStorage;
let score = 0;
let round = 0;
let player = {
    choice: null
}
let computer = {
     choice: ''
}
const scoreDisplay = document.querySelector('.elements__score__display');
const highScoreDisplay = document.querySelector('.elements__score__highscore');
const resultDisplay = document.querySelector('.elements__result__display');
highScoreDisplay.innerHTML = highScoreStorage.getItem('highScore')
scoreDisplay.innerHTML = score;
//Element description on select - strong/weak against
// .1 get selected element
let createSelect = () => {
  const playerAnswers = document.querySelectorAll(".elements__choice__answer");
  playerAnswers.forEach(answer => {
      answer.addEventListener('click', (e) => {
          player.choice = e.target.getAttribute('alt')
          playerAnswers.forEach(answer =>{
              answer.classList.remove('selected')
          })
          e.target.parentNode.classList.add('selected')
      }
      )
  })
}
createSelect()
// .2 Remove selection

// .3 Display selected description

//Reset the game
const resetGame = () =>{
    window.location.reload();
    return false
}
// Reset highscore
const resetHighScore = () =>{
    highScoreStorage.setItem('highScore', 0);
    highScoreDisplay.innerHTML = highScoreStorage.getItem('highScore')

}

//Generate computer choice
const generateComputerChoice = () => {
    computer.choice = choices[Math.floor(Math.random() * choices.length)]
    return computer.choice
}
const getPlayerChoice = () => {
    let selectedValue = document.querySelector(".selected")
    if (player.choice == null) {
        null
    }else{

    player.choice = selectedValue.children[0].getAttribute('alt');
    }
    
    return player.choice
}

//Compare choices/selectwinner
const selectWinner = () =>{
    let result = null;
    generateComputerChoice();
    getPlayerChoice();

    if (player.choice !== null) {
        switch(player.choice+computer.choice){
            //Win choice
            case "firewood":
            case "firemetal":
            case "earthfire":
            case "earthwater":
            case "woodearth":
            case "woodwater":
            case "metalwood":
            case "metalearth":
            case "waterfire":
            case "watermetal":
                result = "win";
                score++;
                round++;
                resultDisplay.innerHTML = `Your element ${player.choice} ${result} against computer element: ${computer.choice}`;
                break;
            //Lose choice
            case "firewater":
            case "fireearth":
            case "earthwood":
            case "earthmetal":
            case "woodfire":
            case "woodmetal":
            case "metalfire":
            case "metalwater":
            case "waterwood":
            case "waterearth":
                result = "lose";
                round++;
                resultDisplay.innerHTML = `Your element ${player.choice} ${result} against computer element: ${computer.choice}`;
                break;
            //Draw choice
            case "firefire":
            case "earthearth":
            case "woodwood":
            case "metalmetal":
            case "waterwater":
                result = "draw";
                round++;
                resultDisplay.innerHTML = `Your element ${player.choice} ${result} against computer element: ${computer.choice}`;
                break;
        }
    }else{
        resultDisplay.innerHTML = `Select your element to play!`
    }
    scoreDisplay.innerHTML = score + "/" + round;

//Update score & highscore - localstorage
    if (round === 20) {
        if (score > highScoreStorage.getItem('highScore')) {
            highScoreStorage.setItem('highScore', score)
        }
        resetGame();
    }
    
}
//Reset highscore