const choices = ["fire", "wood", "water", "metal", "earth"];
let highscore = 0;
let score = 0;
let player = {
    choice: ''
}
let computer = {
    choice: ''
}

const selectWinner = (player, computer) =>{
    let result = null;

    switch(player.choice + computer.choice){
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
            result = player;
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
            result = computer;
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
}

//Element select
//Element description on select - strong/weak against
//Generate computer choice - Math.floor(Math.random() *5 / variable.lenght)?
//Compare choices/selectwinner (switch comparing added strings) - DONE
//Update score & highscore - localstorage