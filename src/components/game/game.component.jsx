import React, { useState } from "react";
import Board from "../board/board.component";
import "./game.component.scss";

const Game = () => {
  const [board, setBoard] = useState(Array(16).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isActive, setIsActive] = useState(false);

  const handleClose = (event) => {
    setIsActive((current) => !current);
  };
  const winner = calculateWinner(board);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [0, 5, 10, 15],
      [3, 6, 9, 12],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d]
      ) {
        return squares[a];
      }
    }

    if (squares.includes(null) === false) {
      return "draw";
    }

    return null;
  }

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (boardCopy[i]) return;
    if (winner || boardCopy[i]) return;
    boardCopy[i] = xIsNext
      ? "fa-duotone fa-swords-laser"
      : "fa-brands fa-jedi-order";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    return (
      <button
        className="reset-btn"
        onClick={() =>
          setBoard(Array(16).fill(null)) + setIsActive((current) => !current)
        }
      >
        Reset Game
      </button>
    );
  };

  return (
    <div>
      <div
        className={
          "winner " + (winner ? "show " : "") + (isActive ? "close" : "")
        }
      >
        <div className="winner__container">
          <button onClick={handleClose}>
            <i className="fa-duotone fa-circle-xmark"></i>
          </button>
          <p className={"winner__content " + (xIsNext ? winner : winner)}>
            <span>{winner ? "This is the way." : ""}</span>
            <i className={xIsNext ? winner : winner}>
              <span>The force is not strong with either of you, try again</span>
            </i>
          </p>
        </div>
      </div>
      <div className="container">
        <div className="logo">
          <span>Tic Tac Toe</span>
        </div>
        <Board squares={board} onClick={handleClick} />
        {resetGame()}
      </div>
    </div>
  );
};

export default Game;
