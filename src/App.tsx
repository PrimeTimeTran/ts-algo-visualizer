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

function getBoard() {
  var board: node[][] = [];
  for (var i = 0; i < 8; i++) {
    board[i] = [];
    for (var j = 0; j < 8; j++) {
      const cur: node = { id: `${i}, ${j}`, checked: false, row: i, col: j };
      board[i][j] = cur;
    }
  }
  return board;
}

function Game() {
  const [board, setBoard] = useState(getBoard())

  function onClick(r: number, c: number) {
    console.log(board)
    board[r][c] = { ...board[r][c], checked: true }
    const newBoard = [...board]
    setBoard(newBoard)
  }

  useEffect(() => {

  }, [board])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {board.map((row, i) => (
            <div key={i}>
              {row.map((col, j) => (
                <span className={`square ${col.checked ? 'checked' : ''}`} onClick={() => onClick(i, j)} key={j}>{col.id}</span>
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
