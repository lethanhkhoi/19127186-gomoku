import "./index.css";
import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import {
  calculateWinner,
  findRowAndCol,
  findCurrentClick,
} from "../../utils/helperFunction";
import Board from "../Board";

const Game = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(25).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next player: X");
  const [list, setList] = useState([]);
  const [count, setCount] = useState(Array(25).fill(null));
  const [current, setCurrent] = useState({
    squares: Array(25).fill(null),
  });
  const [currentClick, setCurrentClick] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [winLines, setWinLines] = useState(Array(5).fill(-1));
  const [isAsc, setIsAsc] = useState(true);
  const handleClick = async (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    let counts = [...count];
    if ((await calculateWinner(squares)) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    squares.map((item, index) => {
      if (item) {
        if (index === i) {
          counts[index] = i;
        } else {
          counts[index] = counts[index];
        }
      } else {
        counts[index] = null;
      }
    });
    counts[i] = stepNumber;
    setCount(counts);
    setHistory(newHistory.concat([{ squares }]));
    setXIsNext(!xIsNext);
    setStepNumber(newHistory.length);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };
  useEffect(() => {
    const getData = async () => {
      const newCurrent = history[stepNumber];
      const winner = await calculateWinner(newCurrent.squares);
      const temp = [...newCurrent.squares.filter((item) => item != null)];
      setCurrentClick(findCurrentClick(temp.length, count));

      setCurrent(newCurrent);
      if (winner) {
        setStatus("Winner: " + winner[0]);
        setWinLines(winner[1]);
      } else {
        setStatus("Next player: " + (xIsNext ? "X" : "O"));
        if (temp.length === 25) {
          setIsDraw(true);
        } else {
          setList(["X", ...temp]);
        }
      }
    };
    getData();
  }, [stepNumber]);
  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => {
            handleClick(i);
          }}
          currentClick={currentClick}
          winLines={winLines}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <div style={{"margin-bottom":"20px"}}>
          <button onClick={() => setIsAsc(true)} >Ascending</button>
          <button onClick={() => setIsAsc(false)} style={{"margin-left":"20px"}}>Descending</button>
        </div>
        <ol>
          {list.map((step, move) => {
            const index = move==0 || isAsc? move : list.length - move;
            const desc = index
              ? "Go to move #" + index + " " + findRowAndCol(index - 1, count)
              : "Go to game start";
            return (
              <li key={index}>
                <button onClick={() => jumpTo(index)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
      {isDraw && (
        <Modal
          title="Notification"
          open={isDraw}
          onOk={() => {
            setIsDraw(false);
          }}
          onCancel={() => {
            setIsDraw(false);
          }}
          okText="OK"
          cancelText="Cancel"
        >
          <p>This is a draw match</p>
        </Modal>
      )}
    </div>
  );
};

export default Game;
