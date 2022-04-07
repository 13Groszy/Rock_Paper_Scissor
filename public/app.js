const choices = ["fire", "wood", "water", "metal", "earth"];
let highscore = 0;
let score = 0;
let player = {
    choice: ''
}
let computer = {
     choice: ''
}
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

const generateComputerChoice = () => {
    computer.choice = choices[Math.floor(Math.random() * choices.length)]
    return computer.choice
}
const getPlayerChoice = () => {
    let selectedValue = document.querySelector(".selected")
    player.choice = selectedValue.children[0].getAttribute('alt');
    return player.choice
}
// const selectWinner = () =>{

//     generateComputerChoice();
//     getPlayerChoice();

//     console.log(player.choice+computer.choice)
// }
const selectWinner = () =>{
    let result = null;
    generateComputerChoice();
    getPlayerChoice();

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
            result = "won";
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
            result = "losed";
            break;
        //Draw choice
        case "firefire":
        case "earthearth":
        case "woodwood":
        case "metalmetal":
        case "waterwater":
            result = "draw";
            break;
    }
    console.log("Your element: " + player.choice + " " + result + " with computer element: " + computer.choice);
}
//Element select
//Element description on select - strong/weak against
//Generate computer choice - Math.floor(Math.random() *5 / variable.lenght)?
//Compare choices/selectwinner (switch comparing added strings) - DONE
//Update score & highscore - localstorage
//Reset highscore