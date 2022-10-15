import { parse } from 'path';
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
  end: boolean;
  start: boolean;
  checked: boolean;
  inRoute: boolean;
  distance: typeof Infinity;
}

type squareProps = {
  j: number;
  i: number;
  onClick: (arg1: number, arg2: number) => void;
  square: {
    id: string;
    end: boolean;
    start: boolean;
    checked: boolean;
    inRoute: boolean;
    distance: typeof Infinity;
  };
}

function Square(props: squareProps) {
  const classes = `
      square 
      ${props.square.end ? 'end' : ''}
      ${props.square.start ? 'start' : ''} 
      ${props.square.checked ? 'checked' : ''} 
      ${props.square.inRoute ? 'inRoute' : ''} 
    `
  return <span
    className={classes}
    key={props.square.id}
    id={props.square.id}
    onClick={() => props.onClick(props.i, props.j)}
  >
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
        inRoute: false,
        end: rc === '5,45',
        distance: Infinity,
        start: rc === '5,5',
        checked: shouldCheck ? true : false,
      };
      board[i][j] = cur;
    }
  }
  return board;
}



function Game() {
  const [board, setBoard] = useState(getBoard())
  let foundit = false
  function backTrack(start: string) {
    setTimeout(() => {
      if (foundit) return
      const splitted = start.split(',')
      var y = parseInt(splitted[0])
      var x = parseInt(splitted[1])

      if (y < 5) {
        y++
      } else if (y > 5) {
        y--
      } else if (x < 45) {
        x++
      } else if (x > 45) {
        x--
      } else if (y === 5 && x === 45) {
        foundit = true
        console.log('found it')
      }
      board[y][x].inRoute = true
      setBoard([...board])
      backTrack(`${y},${x}`)
    }, 100);
  }

  function onClick(r: number, c: number) {
    var seen = new Set()
    var stop = false
    var finishNode = '5,45'
    var start = `${r},${c}`
    function dfs(r: number, c: number, delay: number, distance: number) {
      setTimeout(() => {
        delay += 25
        if (`${r},${c}` === finishNode) {
          stop = true
          backTrack(start)
        }
        if (seen.has(`${r},${c}`) || r < 0 || c < 0 || r === ROWS || c === COLS || stop) {
          return
        }
        seen.add(`${r},${c}`);
        board[r][c] = {
          ...board[r][c],
          checked: true,
          start: start === `${r},${c}`,
          distance: start === `${r},${c}` ? 0 : distance
        }
        const newBoard = [...board]
        setBoard(newBoard)
        dfs(r + 1, c, delay, distance + 1)
        dfs(r, c + 1, delay, distance + 1)
        dfs(r - 1, c, delay, distance + 1)
        dfs(r, c - 1, delay, distance + 1)
      }, delay);
    }
    let delay = 0
    dfs(r, c, delay, 0)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {board.map((row, i) => (
            <div key={i}>
              {row.map((col, j) => (
                <Square
                  i={i}
                  j={j}
                  square={col}
                  onClick={onClick}
                />
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
