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

//Trying Tom's code for point counter buttons - this should keep track of each player's points separately in their own cards
    const [playerPoints, setPlayerPoints] = useState<[string, number][]>(chosenPlayers.map (x => [x, 0]));

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
        , playerPoints
    });
    nav(-2);
}
    return (
      <>
        <div
            className='flex flex-col items-center gap-3'
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
                            {x}'s Points
                        </h2>
                        <h2
                            className='text-4xl font-bold mx-5 min-w-10 text-left'
                        >
                            {
                                playerPoints.find(y => y[0] === x)![1]
                            }
                        </h2>
                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3>Sider: 1 point each</h3>
                                <button 
                                    className="btn btn-neutral btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] -1 : y[1]
                                        ])
                                    )}>
                                    -1
                                </button>

                                <button 
                                    className="btn btn-secondary btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] +1 : y[1]
                                        ])
                                    )}>
                                    +1
                                </button>
                            </div>
                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3>Trotter, Razorback: 5 points each</h3>
                                <button 
                                    className="btn btn-neutral btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] -5 : y[1]
                                        ])
                                    )}>
                                    -5
                                </button>

                                <button 
                                    className="btn btn-secondary btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] +5 : y[1]
                                        ])
                                    )}>
                                    +5
                                </button>
                            </div>
                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3>Snouter: 10 points each</h3>
                                <button 
                                    className="btn btn-neutral btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] -10 : y[1]
                                        ])
                                    )}>
                                    -10
                                </button>

                                <button 
                                    className="btn btn-secondary btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] +10 : y[1]
                                        ])
                                    )}>
                                    +10
                                </button>
                            </div>
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
        </div>
        </>
    );
  };