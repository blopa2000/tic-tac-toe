import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/square";
import { TURNS } from "./constants";
import { checkWinner, checkEndGame } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import Board from "./components/Board";
import { resetStorage, updateStorage } from "./logic/storage";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(() => {
    const turnLocalStorage = window.localStorage.getItem("turn");
    return turnLocalStorage ? JSON.parse(turnLocalStorage) : TURNS.X;
  });
  const [winner, setWinner] = useState(null);
  const [counter, setCounter] = useState(() => {
    const counterLocalStorage = window.localStorage.getItem("counter");
    return counterLocalStorage ? JSON.parse(counterLocalStorage) : [0, 0];
  });

  const resetGame = () => {
    setTimeout(() => {
      setBoard(Array(9).fill(null));
      setWinner(null);
    }, 2000);
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      confetti();
      let newCounter;
      if (newWinner === "✖") {
        newCounter = [counter[0] + 1, counter[1]];
      } else {
        newCounter = [counter[0], counter[1] + 1];
      }

      resetGame();
      updateStorage(newTurn, newCounter);
      setCounter(newCounter);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      resetGame();
    }
  };

  const handleCLickReset = () => {
    resetStorage();
    setCounter([0, 0]);
    setTurn(TURNS.X);
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={handleCLickReset}>Reset</button>
      <Board board={board} updateBoard={updateBoard} />
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
          <h6>{counter[0]}</h6>
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
          <h6>{counter[1]}</h6>
        </Square>
      </section>
      <WinnerModal winner={winner} />
    </main>
  );
}

export default App;
