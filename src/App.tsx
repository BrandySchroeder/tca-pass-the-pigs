import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

import { createHashRouter, RouterProvider } from "react-router-dom";

import { Home, AppTitle } from "./Home";
import { Setup } from "./Setup";
import { Play } from "./Play";
import {
  GameResult,
  getLeaderboard,
  getGeneralFacts,
  getPreviousPlayers,
  getAverageGameDurationsByPlayerCount,
} from "./GameResults";
import { loadGamesFromCloud, saveGameToCloud } from "./tca-cloud-api";
import localforage from "localforage";

const App = () => {

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [gameResults, setGameResults] = useState<GameResult[]>([]);

  const [title, setTitle] = useState(AppTitle);

  const [chosenPlayers, setChosenPlayers] = useState<string[]>([]);

  const [dialogEmail, setDialogEmail] = useState("");

  const [cloudApiEmail, setCloudApiEmail] = useState("");

  useEffect(
    () => {
    const init = async () => {
      
      if (!ignore) {

        const savedEmail = await localforage.getItem<string>("email") ?? "";

        if (savedEmail.length > 0) {

          setCloudApiEmail(savedEmail);
          setDialogEmail(savedEmail);

          const cloudGameResults = await loadGamesFromCloud(
            savedEmail
            , "tca-Pass-the-Pigs-24s"
          );

          setGameResults(cloudGameResults);
        }
        else {
          dialogRef.current?.showModal();
        }
      }
    };

    let ignore = false;
    init();

    return () => {
      ignore = true;
    };
  }
  , [cloudApiEmail]
);

  const addNewGameResult = async (result: GameResult) => {
    //Save the game result to the Cloud.
    await saveGameToCloud(
      cloudApiEmail
      , "tca-Pass-the-Pigs-24s"
      , result.end
      , result
    );

    //Optimistically update the lifted state with the new game result.

    setGameResults([...gameResults, result]);
  };

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <Home
          leaderboardData={getLeaderboard(gameResults)}
          generalFacts={getGeneralFacts(gameResults)}
          setTitle={setTitle}
          avgGameDurationsByPlayerCount={getAverageGameDurationsByPlayerCount(
            gameResults
          )}
        />
      ),
    },
    {
      path: "/setup",
      element: (
        <Setup
          setTitle={setTitle}
          previousPlayers={getPreviousPlayers(gameResults)}
          setChosenPlayers={setChosenPlayers}
        />
      ),
    },
    {
      path: "/play",
      element: (
        <Play
          addNewGameResult={addNewGameResult}
          setTitle={setTitle}
          chosenPlayers={chosenPlayers}
        />
      ),
    },
  ]);

  return (
    <div className="App">
      <div className="navbar bg-primary">
        {title === AppTitle && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"
            />
          </svg>
          
        )}
        <span 
          className="text-lg font-bold ml-3"
        >
          {title}
        </span>
        <div 
          className="ml-auto mr-3"
        >
          <button
            className='mr-3'
            onClick={() => dialogRef.current?.showModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-3">
        <RouterProvider router={router} />
      </div>
      <dialog 
        ref={dialogRef}
        id="email-dialog" 
        className="modal modal-bottom sm:modal-middle"
      >
        <div 
          className="modal-box"
        >
          <h3 
            className="font-bold text-lg"
          >
              Enter email address for saving game results...
          </h3>
          <input 
            type="text" 
            placeholder="Email Address" 
            className="input input-bordered w-full mt-3"
            value={dialogEmail}
            onChange={(e) => setDialogEmail(e.target.value)}
          />
          <div 
            className="modal-action"
          >
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button 
                className="btn btn-primary"
                onClick={async () => {
                  await localforage.setItem<string>("email", dialogEmail);
                  setCloudApiEmail(dialogEmail);
                }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default App;
