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

const ROWS = 10
const COLS = 50

type node = {
  id: string;
  row: number;
  col: number;
  checked: boolean;
  start: boolean;
  end: boolean;
}

type squareProps = {
  j: number;
  i: number;
  onClick: (arg1: number, arg2: number) => void;
  square: {
    id: string;
    checked: boolean;
    start: boolean;
    end: boolean;
  };
}

function Square(props: squareProps) {
  return <span
    key={props.square.id}
    onClick={() => props.onClick(props.i, props.j)}
    className={`square ${props.square.checked ? 'checked' : ''} ${props.square.start ? 'start' : ''} ${props.square.end ? 'end' : ''}`}
  >
    {props.square.id}
  </span>
}

function getBoard(shouldCheck = false) {
  var board: node[][] = [];
  for (var i = 0; i < ROWS; i++) {
    board[i] = [];
    for (var j = 0; j < COLS; j++) {
      const rc = `${i},${j}`
      const cur: node = {
        row: i,
        col: j,
        id: rc,
        checked: shouldCheck ? true : false,
        start: rc === '5,5',
        end: rc === '5,45',
      };
      board[i][j] = cur;
    }
  }
  return board;
}

function Game() {
  const [board, setBoard] = useState(getBoard())
  function onClick(r: number, c: number) {
    var seen = new Set()
    function dfs(r: number, c: number, delay: number) {
      setTimeout(() => {
        delay += 25
        if (seen.has(`${r},${c}`) || r < 0 || c < 0 || r === ROWS || c === COLS) {
          return
        }
        seen.add(`${r},${c}`);
        board[r][c] = { ...board[r][c], checked: true }
        const newBoard = [...board]
        setBoard(newBoard)
        dfs(r + 1, c, delay)
        dfs(r, c + 1, delay)
        dfs(r - 1, c, delay)
        dfs(r, c - 1, delay)
      }, delay);
    }
    let delay = 0
    dfs(r, c, delay)
  }

  // function onDFS() {
  //   let delay = 0
  //   for (let r = 0; r < 8; r++) {
  //     for (let c = 0; c < 8; c++) {
  //       delay += 500
  //       setTimeout(() => {
  //         board[r][c] = { id: `${r},${c}`, checked: true, row: r, col: c }
  //         setBoard([...board])
  //       }, delay);
  //     }
  //   }
  // }

  return (
    <div className="App">
      {/* <button onClick={onDFS}>DFS</button> */}
      <header className="App-header">
        <div>
          {board.map((row, i) => (
            <div key={i}>
              {row.map((col, j) => (
                <Square
                  square={col}
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
