import { useNavigate } from 'react-router-dom';
import { GameResult } from './GameResults';
import { FC, useEffect, useState } from 'react';

interface PlayProps {
    addNewGameResult: (result: GameResult) => void;
    setTitle: (title: string) => void;
    chosenPlayers: string[];
}

type CounterState = {
    count: number;
}

export const Play: FC<PlayProps> = ({ 
    addNewGameResult
    , setTitle
    , chosenPlayers 
}) => {

    const [start, setStart] = useState(new Date().toISOString());
    
    const [turnNumber, setTurnNumber] = useState(1);

    const [state, setState] = useState<CounterState>({ count: 0 })

    const decrementByOne = () => {
        setState({ count: state.count - 1 })
    }

    const incrementByOne = () => {
        setState({ count: state.count + 1 })
    }

    const decrementByFive = () => {
        setState({ count: state.count - 5 })
    }

    const incrementByFive = () => {
        setState({ count: state.count + 5 })
    }

    const decrementByTen = () => {
        setState({ count: state.count - 10 })
    }

    const incrementByTen = () => {
        setState({ count: state.count + 10 })
    }

    const reset = () => {
        setState({ count: 0 })
    }
    

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

    return (
      <>
        <div
            className='card bg-base-100 mb-4 mt-3 shadow-xl'
        >
            <div
                className='card-body p-3'
            >
                <div
                    className='card-actions flex items-center flex-col mb-5'
                >
                <div>
                    Sider: 1 point each
                    <button onClick={decrementByOne} className="btn btn-neutral btn-md btn-circle m-2">-1</button>
                    <button onClick={incrementByOne} className="btn btn-secondary m-2">+1</button>
                </div>
  
                <div>
                    Trotter, Razorback: 5 points each
                    <button onClick={decrementByFive} className="btn btn-neutral btn-md btn-circle m-2">-5</button>
                    <button onClick={incrementByFive} className="btn btn-secondary m-2">+5</button>
                </div>
  
                <div>
                    Snouter: 10 points each
                    <button onClick={decrementByTen} className="btn btn-neutral btn-md btn-circle m-2">-10</button>
                    <button onClick={incrementByTen} className="btn btn-secondary m-2">+10</button>
                </div>
        
                <h3>Player 1's Total this turn: {state.count}</h3>
                <br></br>
                <div>
                    <button onClick={reset} className="btn btn-neutral m-2">Reset</button>
                </div>


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
            <p>Player so and so's Total points this game: </p>
                add up (and subtract) total points for game - running tally and list each players current game points
                    </div>
                </div>
        </div>

        <div
            className='flex flex-col gap-3'
        >
            {chosenPlayers.map(x => (
                                <div
                                    key={x}
                                className='card bg-base-100 shadow-xl'
                            >
                                <div 
                                    className='card-body p-3'
                                >
                                    <h2 className='card-title'
                                    >
                                        {x}
                                    </h2>
                                    <p>
                                        Put other controls here
                                    </p>
                                    <p>
                                        And probably need some local state to control the controls
                                    </p>
                                    <button
                                        key={x}
                                        className="btn btn-lg btn-primary"
                                        onClick={() => gameOver(x)}
                                    >
                                        {x} Won
                                    </button>
                                </div>
                            </div>
            ))
            }
            <p>
                Current Turn: 1
                //TODO: Instead of counting each turn, change from one player's turn to the next
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