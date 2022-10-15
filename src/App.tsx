import { useState } from 'react'

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
  distance: typeof Infinity | string;
}

type squareProps = {
  onClick: (arg1: { type: string; }, arg2: number, arg3: number) => void;
  square: {
    id: string;
    end: boolean;
    start: boolean;
    checked: boolean;
    inRoute: boolean;
    distance: typeof Infinity | string;
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

  const r = parseInt(props.square.id.split(',')[0])
  const c = parseInt(props.square.id.split(',')[1])

  return <span
    className={classes}
    onClick={(e) => props.onClick(e, r, c)}
  >
    {props.square.inRoute ? props.square.distance : props.square.start ? 'Start' : ''}
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

  function backTrack(start: string) {
    let found = false
    setTimeout(() => {
      if (found) return
      const vals = start.split(',')
      var y = parseInt(vals[0])
      var x = parseInt(vals[1])
      if (y < 5) {
        y++
      } else if (y > 5) {
        y--
      } else if (x < 45) {
        x++
      } else if (x > 45) {
        x--
      } else if (y === 5 && x === 45) {
        found = true
      }
      board[y][x].inRoute = true
      setBoard([...board])
      backTrack(`${y},${x}`)
    }, 100);
  }

  function onClick(e: { type: string }, r: number, c: number) {
    var stop = false
    var finishNode = '5,45'
    var start = `${r},${c}`
    function dfs(r: number, c: number, delay: number, distance: number) {
      setTimeout(() => {
        delay += 100
        if (`${r},${c}` === finishNode) {
          board[r][c] = {
            ...board[r][c],
            checked: true,
            start: start === `${r},${c}`,
            distance: 'Finish'
          }
          stop = true
          setTimeout(() => backTrack(start), 1000)
        }
        if (r < 0 || c < 0 || r === ROWS || c === COLS || stop || board[r][c].checked) {
          return
        }
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
    if (e.type === 'click') {
      dfs(r, c, delay, 0)
    } else if (e.type === 'contextmenu') {
      console.log('Right click');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          {board.map((row, i) => (
            <div key={i}>
              {row.map((square, j) => {
                return <Square
                  key={square.id}
                  square={square}
                  onClick={onClick}
                />
              })}
            </div>
          ))}
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
