import { useNavigate } from 'react-router-dom';
import { GameResult, PlayerPoints } from './GameResults';
import { FC, useEffect, useState } from 'react';
import Sider from './Images/Sider.png';
import Trotter from './Images/Trotter.png';
import LeaningJowler from './Images/LeaningJowler.png';
import Razorback from './Images/Razorback.png';
import Snouter from './Images/Snouter.png';
import DoubleTrotter from './Images/DoubleTrotter.png';
import DoubleLeaningJowler from './Images/DoubleLeaningJowler.png';
import DoubleRazorback from './Images/DoubleRazorback.png';
import DoubleSnouter from './Images/DoubleSnouter.png';
import PigOut from './Images/PigOut.png';
import Oinker from './Images/Oinker.png';


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
    const [playerPoints, setPlayerPoints] = useState<PlayerPoints>(chosenPlayers.map (x => [x, {turnPoints:0, totalPoints: 0}]));

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
                        <h2 className='card-title text-2xl font-bold'
                        >
                            {x}'s Points
                        </h2>
                        <h2 className='text-xl mx-5 min-w-10 text-left'
                        >
                            This Game: 
                            {
                                playerPoints.find(y => y[0] === x)![1].totalPoints
                            }
                        </h2>

                        <h2 className='text-xl mx-5 min-w-10 text-left'
                        >
                            This Turn:
                            {
                                playerPoints.find(y => y[0] === x)![1].turnPoints
                            }
                        </h2>

                        <div className="flex gap-3 items-center mb-5"
                        >
                            <button className="btn btn-md btn-accent btn-oval" 
                                //onClick={resetPointsThisTurn}
                                onClick = {() => setPlayerPoints(
                                    playerPoints.map (y => [
                                        y[0]
                                        , {turnPoints: y[0]===x ? 0 : y[1].turnPoints, totalPoints: y[0]===x ? y[1].totalPoints + y[1].turnPoints : y[1].totalPoints}
                                    ])
                                )}>

                                Next Turn
                                
                            </button>
                        </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-20 h-12">
                                        <img src= { Sider } alt="pigs on side"/>
                                    </div>
                                </div>
                                    <h3 className='font-bold'>Sider: 1 point</h3>
                                        <button 
                                            className="btn btn-secondary btn-circle m-2"
                                            onClick = {() => setPlayerPoints(
                                                playerPoints.map (y => [
                                                    y[0]
                                                    , {turnPoints: y[0]===x ? y[1].turnPoints +1 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                                ])
                                            )}>
                                            +1
                                        </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                 <div className="avatar">
                                    <div className="rounded w-12 h-12">
                                        <img src= { Razorback } alt="pigs on back"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Razorback: 5 points</h3>
                                <button 
                                    className="btn btn-secondary btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints +5 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    +5
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-12 h-12">
                                        <img src= { Trotter } alt="pigs on all four feet"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Trotter: 5 points</h3>
                                <button 
                                    className="btn btn-secondary btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints +5 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    +5
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-12 h-12">
                                        <img src= { Snouter } alt="pigs on snout"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Snouter: 10 points</h3>
                                <button 
                                    className="btn btn-secondary btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints +10 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    +10
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-12 h-12">
                                        <img src= { LeaningJowler } alt="pigs on ear and snout"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Leaning Jowler: 15 points</h3>
                                <button 
                                    className="btn btn-secondary btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints +15 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    +15
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-20 h-12">
                                        <img src= { DoubleRazorback } alt="both pigs on backs"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Double Razorback: 20 points</h3>
                                <button 
                                    className="btn btn-secondary btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints +20 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    +20
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-20 h-12">
                                        <img src= { DoubleTrotter } alt="both pigs on all fours"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Double Trotter: 20 points</h3>
                                <button 
                                    className="btn btn-secondary btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints +20 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    +20
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-20 h-12">
                                        <img src= { DoubleSnouter } alt="both pigs on snouts"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Double Snouter: 40 points</h3>
                                <button 
                                    className="btn btn-secondary btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints +40 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    +40
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-20 h-12">
                                        <img src= { DoubleLeaningJowler } alt="both pigs on ears"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Double Leaning Jowler: 60 points</h3>
                                <button 
                                    className="btn btn-secondary btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints +60 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    +60
                                </button>
                            </div>

                            <div className="flex gap-3 items-center mb-5"
                            >
                                <h3 className='font-bold'>Undo:</h3>
                                <button 
                                    className="btn btn-warning btn-outline btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints -1 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    -1
                                </button>
                                <button 
                                    className="btn btn-warning btn-outline btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints -5 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    -5
                                </button>
                                <button 
                                    className="btn btn-warning btn-outline btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints -10 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    -10
                                </button>
                                <button 
                                    className="btn btn-warning btn-outline btn-circle m-2"
                                    onClick = {() => setPlayerPoints(
                                        playerPoints.map (y => [
                                            y[0]
                                            , {turnPoints: y[0]===x ? y[1].turnPoints -20 : y[1].turnPoints, totalPoints: y[1].totalPoints}
                                        ])
                                    )}>
                                    -20
                                </button>
                            </div>
                            
                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-20 h-12">
                                        <img src= { PigOut } alt="opposite siders"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Lose all points this turn!</h3>
                                <button 
                                className="btn btn-md btn-oval btn-outline btn-error"
                                onClick = {() => setPlayerPoints(
                                    playerPoints.map (y => [
                                        y[0]
                                        , {turnPoints: 0, totalPoints: y[0]===x ? y[1].totalPoints : y[1].totalPoints}
                                    ])
                                )}
                                >                               
                                    Pig Out! 
                                </button>                               
                            </div>
    
                            <div className="flex gap-3 items-center mb-5"
                            >
                                <div className="avatar">
                                    <div className="rounded w-20 h-12">
                                        <img src= { Oinker } alt="pigs touching"/>
                                    </div>
                                </div>
                                <h3 className='font-bold'>Lose all points in game!</h3>
                                <button 
                                className="btn btn-md btn-oval btn-outline btn-error"
                                onClick = {() => setPlayerPoints(
                                    playerPoints.map (y => [
                                        y[0]
                                        , {turnPoints: 0, totalPoints: 0}
                                    ])
                                )}
                                >
                                    OINKER!! 
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