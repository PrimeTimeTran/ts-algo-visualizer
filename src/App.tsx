import { useState, useEffect } from 'react'

import './App.css';

// interface square {
//   id: number,
//   weight: 0,
//   path: null,
//   status: string,
//   direction: null,
//   previousNode: null,
//   storedDirection: null,
//   relatesToObject: false,
//   heuristicDistance: null,
//   distance: typeof Infinity,
//   totalDistance: typeof Infinity,
//   overwriteObjectRelation: false,
//   // otherid: id,
//   // otherstatus: status,
//   // otherpreviousNode: null,
//   // otherpath: null,
//   // otherdirection: null,
//   // otherstoredDirection: null,
//   // otherdistance: Infinity,
//   // otherweight: 0,
//   // otherrelatesToObject: false,
//   // otheroverwriteObjectRelation: false,
// }

type node = {
  id: string;
  row: number;
  col: number;
  checked: boolean;
}

type squareProps = {
  j: number;
  i: number;
  onClick: (arg1: number, arg2: number) => void;
  col: {
    id: string;
    checked: boolean;
  };
}

function Square(props: squareProps) {
  return <span
    key={props.j}
    id={props.col.id}
    onClick={() => props.onClick(props.i, props.j)}
    className={`square ${props.col.checked ? 'checked' : ''}`}
  >
    {props.col.id}
  </span>
}


function getBoard(shouldCheck = false) {
  var board: node[][] = [];
  for (var i = 0; i < 8; i++) {
    board[i] = [];
    for (var j = 0; j < 8; j++) {
      const cur: node = { id: `${i},${j}`, checked: shouldCheck ? true : false, row: i, col: j };
      board[i][j] = cur;
    }
  }
  return board;
}

function Game() {
  const [board, setBoard] = useState(getBoard())

  function onClick(r: number, c: number) {
    board[r][c] = { ...board[r][c], checked: true }
    const newBoard = [...board]
    setBoard(newBoard)
  }

  function onDFS() {
    let delay = 0
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        delay += 500
        setTimeout(() => {
          board[r][c] = { id: `${r},${c}`, checked: true, row: r, col: c }
          setBoard([...board])
        }, delay);
      }
    }
  }

  return (
    <div className="App">
      <button onClick={onDFS}>DFS</button>
      <header className="App-header">
        <div>
          {board.map((row, i) => (
            <div key={i}>
              {row.map((col, j) => (
                <Square
                  col={col}
                  i={i}
                  j={j}
                  onClick={onClick}
                />
                // <span id={col.id} className={`square ${col.checked ? 'checked' : ''}`} onClick={() => onClick(i, j)} key={j}>{col.id}</span>
              ))}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

function App() {
  return <div>
    <Game />
  </div>
}

export default App;
