const pairs = import('../pairs.json', {
    assert: {
        type: 'json'
    }
});

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
    if (player.choice !== null) {
        player.choice = selectedValue.children[0].getAttribute('alt');
    }

    return player.choice
}
const displayResult = (playerChoice, computerChoice, result) => {
    resultDisplay.innerHTML = `Your element ${playerChoice} ${result} against computer element ${computerChoice}`;
}


const selectWinner = () => {
    if (round === 20) {
        if (score > highScoreStorage.getItem('highScore')) {
            highScoreStorage.setItem('highScore', score)
        }
        resetGame();
    }else{
        getPlayerChoice();
        generateComputerChoice();

        pairs
    .then((value =>{
        let result = value.default[0].pairs[player.choice][computer.choice]
        if (result === true) {
            displayResult(player.choice, computer.choice, "won")
            score++;
            round++;
        } else if (result === false) {
            displayResult(player.choice, computer.choice, "lose")
            round++;
        } else {
            displayResult(player.choice, computer.choice, "draw")
            round++;
        }
        scoreDisplay.innerHTML = score + "/" + round;

    }))
    .catch((err) =>[
        resultDisplay.innerHTML = `Select your element to play!`,
        console.log(err)
    ])
    }
}