import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";
import GuessResult from "../GuessResult/GuessResult";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import GameOverBanner from "../GameOverBanner/GameOverBanner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {

    const [gameStatus, setGameStatus] = React.useState('running');
    const [guesses, setGuesses] = React.useState([]);

    function handleSubmitGuess(tentativeGuess) {

        const nextGuesses = [...guesses, tentativeGuess]
        setGuesses(nextGuesses);

        if (tentativeGuess.toUpperCase() === answer) {
            setGameStatus('won');
        } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED){
            setGameStatus('lost')
        
        }
    }

    return (
        <>
        {gameStatus}
            <GuessInput gameStatus={gameStatus} handleSubmitGuess={handleSubmitGuess} />
            <GuessResult guesses={guesses} answer={answer}/>

            {gameStatus !== 'running' && (
                <GameOverBanner gameStatus={gameStatus} numOfGuesses={guesses.length} answer={answer}/>
            )}
        </>
    );
}


export default Game;
