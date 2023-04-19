import React from "react";
import { Square } from "./square";

const WinnerModal = ({ winner }) => {
  if (winner === null) return null;
  const winnerText = winner === false ? "empate" : "ganador: " + winner;
  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>

        <header className="win">{winner && <Square>{winner}</Square>}</header>
      </div>
    </section>
  );
};

export default WinnerModal;
