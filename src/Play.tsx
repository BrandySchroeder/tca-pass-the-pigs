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

    //ASK: why is setStart dim, declared but not read?
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
                        >This Game: 
                            {
                                playerPoints.find(y => y[0] === x)![1]
                            }
                        </h2>
                        <h2
                            className='text-2xl font-bold mx-5 min-w-10 text-left'
                        >This Turn:
                            {
                                playerPoints.find(y => y[0] === x)![1]
                            }
                        </h2>
                        <p>*Placeholder* Need to hook up functionality for this turn feature!</p>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-12 h-12">
                                        <img src={`Sider`} alt="pigs on side"/>
                                    </div>
                                </div>
                                    <h3>Sider: 1 point each</h3>
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

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3>Leaning Jowler: 15 points each</h3>
                                <button 
                                    className="btn btn-secondary btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] +15 : y[1]
                                        ])
                                    )}>
                                    +15
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3>Double Trotter, Double Razorback: 20 points</h3>
                                <button 
                                    className="btn btn-secondary btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] +20 : y[1]
                                        ])
                                    )}>
                                    +20
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3>Double Snouter: 40 points</h3>
                                <button 
                                    className="btn btn-secondary btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] +40 : y[1]
                                        ])
                                    )}>
                                    +40
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3>Double Leaning Jowler: 60 points</h3>
                                <button 
                                    className="btn btn-secondary btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] +60 : y[1]
                                        ])
                                    )}>
                                    +60
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3>Undo</h3>
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
                                    className="btn btn-neutral btn-md btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , y[0]===x ? y[1] -20 : y[1]
                                        ])
                                    )}>
                                    -20
                                </button>
                            </div>
                            <div className="flex gap-3 items-center mb-5"
                            >
                                <button className="btn btn-md btn-oval btn-warning">
                                    Pig Out! 
                                </button>
                                <p>Lose all points this turn. Placeholder button - need to figure out how to track points per turn separately from points per game. Also how to track in fun facts</p>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <button className="btn btn-md btn-oval btn-warning">
                                    OINKER!! 
                                </button>
                                <p>Lose all points in game! Placeholder button - need to figure out how to track this in fun facts. Also set it up to erase all points.</p>
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