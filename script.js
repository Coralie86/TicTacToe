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

    return {name, score, nthplayer, getRoundNumber, play, increaseScore, getScore}

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
                console.log("Round Finished!")
        } else {
            if (gameboard_arr.includes('')){
            console.log("Next Player")
        } else {
            console.log("it was a tie.")
            round_finished = true;
        }}
        return round_finished;
    }

    function getRoundFinished() {
        return round_finished
    }
    return { getRoundFinished, winning_combination}
}

// add the incressing score for the user
// Create a GameBoard Object to handle the render



// Global
const player1 = createUser("Bidule", "O");
const player2 = createUser("Truc", "X");

play_round();



