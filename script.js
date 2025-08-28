gameboard_arr = ['', '', '', '', '', '', '', '', '']

function createUser(name, mark_type) {
    let score =0;
    let nthplayer = "player2"; 
    if (mark_type == 'X') {
        nthplayer = "player1";
    }
    let round_nb = 0;
    function play(cell) {
        if (gameboard_arr[cell] == ''){
            gameboard_arr[cell] = mark_type;
            round_nb ++;
        } else {
            console.log('Already chosen. Play another cell.')
        }
    }

    function getRoundNumber () {
        return round_nb;
    }

    function increaseScore () {
        return score++;
    }

    function getScore () {
        return score;
    }

    function resetRoundNumber () {
        round_nb = 0;
    }

    return {name, score, nthplayer, getRoundNumber, play, increaseScore, getScore, resetRoundNumber }

}

// Create Game Object handling a round
function play_round() {
    let round_finished = false;
    
    while (round_finished == false) {
        if (player1.getRoundNumber() == player2.getRoundNumber()) {
            let cell = prompt("player1 choose a cell.")
            player1.play(cell);
        } else if (player1.getRoundNumber() > player2.getRoundNumber()) {
            let cell = prompt("player2 choose a cell.")
            player2.play(cell);
        }
        winning_combination();
        console.log(gameboard_arr);
    }

    function resetRound() {
        player1.resetRoundNumber();
        player2.resetRoundNumber();
        gameboard_arr = ['', '', '', '', '', '', '', '', ''];
    }
    
    function winning_combination() {
        if ((gameboard_arr[0] == gameboard_arr[1] && gameboard_arr[0] == gameboard_arr[2] && gameboard_arr[0] != '')
            || (gameboard_arr[3] == gameboard_arr[4] && gameboard_arr[3] == gameboard_arr[5] && gameboard_arr[3] != '')
            || (gameboard_arr[6] == gameboard_arr[7] && gameboard_arr[6] == gameboard_arr[8] && gameboard_arr[6] != '')
            || (gameboard_arr[0] == gameboard_arr[3] && gameboard_arr[0] == gameboard_arr[6] && gameboard_arr[0] != '')
            || (gameboard_arr[1] == gameboard_arr[4] && gameboard_arr[1] == gameboard_arr[7] && gameboard_arr[1] != '')
            || (gameboard_arr[2] == gameboard_arr[5] && gameboard_arr[2] == gameboard_arr[8] && gameboard_arr[2] != '')
            || (gameboard_arr[0] == gameboard_arr[4] && gameboard_arr[0] == gameboard_arr[8] && gameboard_arr[0] != '')    
            || (gameboard_arr[2] == gameboard_arr[4] && gameboard_arr[2] == gameboard_arr[6] && gameboard_arr[2] != '')){
                round_finished = true;
                if (player1.getRoundNumber() > player2.getRoundNumber()) {
                    player1.increaseScore();
                    console.log(`Round Finished! ${player1.name} wins!! Score is ${player1.getScore()} for ${player1.name} to ${player2.getScore()} for ${player2.name}.`)
                }else {
                    player2.increaseScore();
                    console.log(`Round Finished! ${player2.name} wins!! Score is ${player1.getScore()} for ${player1.name} to ${player2.getScore()} for ${player2.name}.`)
                }
                resetRound();               
        } else {
            if (gameboard_arr.includes('')){
            console.log("Next Player")
        } else {
            console.log("it was a tie.")
            round_finished = true;
            resetRound();
        }}
        return round_finished;
    }

    function getRoundFinished() {
        return round_finished
    }
    return { getRoundFinished, winning_combination}
}


// Create a GameBoard Object to handle the render

const board = document.querySelector('.game');
const textStart = document.createElement("p");
textStart.textContent = "Click on Start Game!";
board.appendChild(textStart);

const startGame_btn = document.querySelector('#start');
startGame_btn.addEventListener('click', function() {
    for (let i = 1; i<4; i++){
        const row = document.createElement("div");
        for (let u = 1; u<4; u++){
            const cell = document.createElement("div");
            cell.id = `${i}-${u}`;
            cell.textContent = '';
            cell.classList.add("cell")
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
    board.removeChild(textStart);
})





// Global
// const player1 = createUser("Bidule", "O");
// const player2 = createUser("Truc", "X");

// play_round();
// play_round();





