gameboard_arr = [['', '', ''], ['', '', ''], ['', '', '']]

const Game = gameBoard();
Game.resetAllGame();



function createUser(name, mark_type) {
    let score =0;
    let nthplayer = "player2"; 
    if (mark_type == 'X') {
        nthplayer = "player1";
    }
    let round_nb = 0;
    function play(row,ele) {
        if (gameboard_arr[row][ele] == ''){
            gameboard_arr[row][ele] = mark_type;
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
function play_round(player1, player2) {
    let round_finished = false;
    let player = player1;

    function updateAr(row, ele) {
        player.play(row, ele);
        if (player == player1){
            player = player2
        } else if (player == player2) {
            player = player1;
        }
        console.log(gameboard_arr);
        console.log(player);
        winning_combination();
    }

    function resetRound() {
        player1.resetRoundNumber();
        player2.resetRoundNumber();
        gameboard_arr = [['', '', ''], ['', '', ''], ['', '', '']];
        round_finished = false;
    }
    
    function winning_combination() {
        if ((gameboard_arr[0][0] == gameboard_arr[0][1] && gameboard_arr[0][0] == gameboard_arr[0][2] && gameboard_arr[0][0] != '') ||
    (gameboard_arr[1][0] == gameboard_arr[1][1] && gameboard_arr[1][0] == gameboard_arr[1][2] && gameboard_arr[1][0] != '') ||
    (gameboard_arr[2][0] == gameboard_arr[2][1] && gameboard_arr[2][0] == gameboard_arr[2][2] && gameboard_arr[2][0] != '') ||
    (gameboard_arr[0][0] == gameboard_arr[1][0] && gameboard_arr[0][0] == gameboard_arr[2][0] && gameboard_arr[0][0] != '') ||
    (gameboard_arr[0][1] == gameboard_arr[1][1] && gameboard_arr[0][1] == gameboard_arr[2][1] && gameboard_arr[0][1] != '') ||
    (gameboard_arr[0][2] == gameboard_arr[1][2] && gameboard_arr[0][2] == gameboard_arr[2][2] && gameboard_arr[0][2] != '') ||
    (gameboard_arr[0][0] == gameboard_arr[1][1] && gameboard_arr[0][0] == gameboard_arr[2][2] && gameboard_arr[0][0] != '') ||
    (gameboard_arr[0][2] == gameboard_arr[1][1] && gameboard_arr[0][2] == gameboard_arr[2][0] && gameboard_arr[0][2] != '')){
                round_finished = true;
                if (player1.getRoundNumber() > player2.getRoundNumber()) {
                    player1.increaseScore();                    
                    console.log(`Round Finished! ${player1.name} wins!! Score is ${player1.getScore()} for ${player1.name} to ${player2.getScore()} for ${player2.name}.`)
                }else {
                    player2.increaseScore();
                    console.log(`Round Finished! ${player2.name} wins!! Score is ${player1.getScore()} for ${player1.name} to ${player2.getScore()} for ${player2.name}.`)
                }       
        } else {
            let is_empty = false;
            for (let i=0; i<3; i++){                
                if (gameboard_arr[i].includes('')){
                    is_empty = true;                    
                }
            }
            if (is_empty) {
                console.log("Next Player")
            }
            else {
            console.log("it was a tie.")
            round_finished = true;
            // resetRound();
            }
            
        }
        return round_finished;
    }

    function getRoundFinished() {
        return round_finished
    }

    function getPlayer() {
        return player;
    }

    function getAllPlayers(){
        return [player1, player2]
    }
    return { player, getRoundFinished, winning_combination, updateAr, resetRound, getPlayer, getAllPlayers}
}


// function to Reset all Game
function gameBoard() {
    const board = document.querySelector('.game');
    const prompt_grid = document.createElement("div");
    prompt_grid.id = "prompt_grid";
    const input1 = document.querySelector("#player1");
    const input2 = document.querySelector("#player2");
    const startGame_btn = document.querySelector('#start');
    const resetAll_btn = document.querySelector('#resetAll');
    const reset_Grid = document.querySelector('#reset');
    const show_result_btn = document.querySelector('#show_result');
    show_result_btn.setAttribute("clicked", false);

    function resetGrid() {
        if (board.contains(document.querySelector("#grid"))) {
            const cells = document.querySelectorAll(".cell");
            cells.forEach(function(item) {
                item.textContent = '';
                item.classList.remove('X-color');
                item.classList.remove('O-color');
            }
        );
        }
        game_object.resetRound();
        updatePrompt();
    }

    function resetAllGame() {
        if (!board.contains(document.getElementById("textStart"))) {
            const textStart = document.createElement("p");
            textStart.textContent = "Insert Players' names and click on Start Game!";        
            textStart.id = "textStart";
            board.appendChild(textStart);
        }
        if (board.contains(document.querySelector("#prompt_grid"))) {
            prompt_grid.removeChild(document.querySelector("#prompt"));
            prompt_grid.removeChild(document.querySelector("#grid"));
        }
        if (board.contains(document.querySelector("#show_result"))) {
            board.removeChild(document.querySelector("#show_result"));
            board.classList.remove("game_result");
            document.querySelector("#prompt_grid").classList.remove("prompt_grid_result");
            document.querySelector("#show_result").classList.remove("show_result");
        }
        input1.value = '';
        input2.value = '';
    }
    
    function createGrid() {
        const grid = document.createElement("div");
        grid.id = "grid";
        for (let i = 0; i<3; i++){
            const row = document.createElement("div");
            row.classList.add("row");
            for (let u = 0; u<3; u++){
                const cell = document.createElement("div");
                cell.id = [u,i];
                cell.textContent = gameboard_arr[u][1];
                console.log()
                cell.classList.add("cell");
                cell.addEventListener('click', function () {
                    if (game_object.getRoundFinished() == false) {
                        const [row, col] = this.id.split(",").map(Number);
                        if (gameboard_arr[row][col] == ''){
                            console.log(this);
                            game_object.updateAr(row, col);
                            this.textContent = gameboard_arr[row][col];
                            if (this.textContent == 'X'){
                                this.classList.add('X-color');
                            } else if (this.textContent == 'O'){
                                this.classList.add('O-color');
                            }
                            updatePrompt();
                            updateResult(game_object.getAllPlayers()[0], game_object.getAllPlayers()[1]);
                        } else {
                            console.log("Already selected. Try another cell.");
                        }
                    } else {
                        console.log('Round finished');
                        updateResult(game_object.getAllPlayers()[0], game_object.getAllPlayers()[1]);
                    }
                    
                })
                row.appendChild(cell);
            }
            grid.appendChild(row);
        }
        board.removeChild(document.querySelector("#textStart"));
        prompt_grid.appendChild(grid)
        board.appendChild(prompt_grid);
    }

    function displayPrompt() {
        if(!board.contains(document.querySelector("#prompt"))){
            let prompt = document.createElement("p");
            prompt.id = 'prompt';
            player = game_object.getPlayer();
            prompt.textContent = `It's ${player.name} turn.`
            prompt_grid.appendChild(prompt);
        }
    }

    function updatePrompt() {
        let prompt = document.querySelector('#prompt');
        if (game_object.getRoundFinished() == false) {
            player = game_object.getPlayer();
            prompt.textContent = `It's ${player.name} turn.`
        } else {
            prompt.textContent = `Round is finished!`
        }
    }

    function createResults(player1, player2) {
        const show_result = document.createElement("div");
        show_result.id ="show_result";
        const result_title = document.createElement("h1");
        result_title.textContent = "Results";
        const score_div = document.createElement("div");
        score_div.classList.add("score_div");
        const playerScore1 = document.createElement("p");
        playerScore1.id = 'player1Score';
        playerScore1.textContent = `${player1.name} has a score of ${player1.getScore()}`;
        const playerScore2 = document.createElement("p");
        playerScore2.id = 'player2Score';
        playerScore2.textContent = `${player2.name} has a score of ${player2.getScore()}`;

        score_div.appendChild(playerScore1);
        score_div.appendChild(playerScore2);

        show_result.appendChild(result_title);
        show_result.appendChild(score_div);

        board.appendChild(show_result);
    }

    function updateResult(player1,player2){
        const playerScore1 = document.querySelector('#player1Score');
        const playerScore2 = document.querySelector('#player2Score');
        playerScore1.textContent = `${player1.name} has a score of ${player1.getScore()}`;
        playerScore2.textContent = `${player2.name} has a score of ${player2.getScore()}`;
    }

     // event to create the grid
    startGame_btn.addEventListener('click', function() {
        const player1_name = input1.value;
        const player2_name = input2.value;
        const player1 = createUser(player1_name, 'X');
        const player2 = createUser(player2_name, 'O');

        game_object = play_round(player1, player2);
        displayPrompt();
        createGrid();        
    })

     // Event to reset the all Game
    reset_Grid.addEventListener('click', function() {
        resetGrid();
    })

    // Event to reset the all Game
    resetAll_btn.addEventListener('click', function() {
        resetAllGame();
    })

    show_result_btn.addEventListener('click', function(){
        if(!board.contains(document.querySelector("#show_result"))){
            player1 = game_object.getAllPlayers()[0];
            player2 = game_object.getAllPlayers()[1];
            createResults(player1, player2);
            board.classList.add("game_result");
            document.querySelector("#prompt_grid").classList.add("prompt_grid_result");
            document.querySelector("#show_result").classList.add("show_result");
        } else {
            board.removeChild(document.querySelector("#show_result"));
            board.classList.remove("game_result");
            document.querySelector("#prompt_grid").classList.remove("prompt_grid_result");
            document.querySelector("#show_result").classList.remove("show_result");
        }
    })

    return {resetAllGame, createGrid, updatePrompt}
}



