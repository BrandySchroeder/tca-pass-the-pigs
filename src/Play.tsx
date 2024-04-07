import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
    addNewGameResult: (result: GameResult) => void;
    setTitle: (title: string) => void;
    chosenPlayers: string[];
}

export const Play: FC<PlayProps> = ({ 
    addNewGameResult
    , setTitle
    , chosenPlayers 
}) => {

    const [start, setStart] = useState(new Date().toISOString());
    
    const [turnNumber, setTurnNumber] = useState(1);
    
    useEffect(   
        () => setTitle("Play Pass The Pigs")
         , []
    );

    const nav = useNavigate();

//Local helper functions just before JSX...

const gameOver = (winner: string) => {
    addNewGameResult({
        winner: winner
        , players: chosenPlayers
        , start: start
        , end: new Date().toISOString()
        , totalTurns: turnNumber
    });
    nav(-2);
}
const keepScore = () => {

}

    return (
      <>
        <div
            className='card bg-base-100 mb-4 mt-3 shadow-xl'
        >
            <div
                className='card-body p-3'
            >
                <div
                    className='flex items-center mb-5'
                >
            <h3>Player 1's Points this turn: </h3>
                <button className="btn btn-secondary">-1</button>
                
                <button className="btn btn-secondary">+1</button>

                <button className="btn btn-secondary">-5</button>
                
                <button className="btn btn-secondary">+5</button>

                <button className="btn btn-secondary">-10</button>
                
                <button className="btn btn-secondary">+10</button>

                <p>Player 1's Total this turn: </p>
                    </div>
                </div>
        </div>
        <div
            className='card bg-base-100 mb-4 shadow-xl'
        >
            <div
                className='card-body p-3'
            >
                <div
                    className='flex items-center mb-5'
                >
            <p>Player 1's Total points this game: </p>
                add up (and subtract) total points for game - running tally
                    </div>
                </div>
        </div>

        <div
            className='flex flex-col gap-3'
        >
            {chosenPlayers.map(x => (
                <button
                key={x}
                className="btn btn-lg btn-primary"
                onClick={() => gameOver(x)}
                >
                    {x} Won
                </button>
            ))
            }

            <p
                className="text-xs"
            >
                Play the game and tap the app!!
            </p>
            <p>
                Current Turn: 1
            </p>
            <button
                className='btn btn-link'
                onClick={() => setTurnNumber(turnNumber + 1)}
            >
                Next Turn
            </button>
        </div>
        </>
    );
  };