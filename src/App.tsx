import { useState } from 'react'

import './App.css';

const ROWS = 20
const COLS = 50
const START_NODE = '10,5'
const FINISH_NODE = '10,45'

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
  square: node;
  onClick: (arg1: { type: string; }, arg2: number, arg3: number) => void;
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
    onContextMenu={(e) => props.onClick(e, r, c)}
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
        distance: Infinity,
        end: rc === FINISH_NODE,
        start: rc === START_NODE,
        checked: shouldCheck ? true : false,
      };
      board[i][j] = cur;
    }
  }
  return board;
}

function Game() {
  const [board, setBoard] = useState(getBoard())
  const [finishNode, setFinishNode] = useState(FINISH_NODE)

  function backTrack(start: string) {
    let found = false
    setTimeout(() => {
      if (found) return
      const vals = start.split(',')
      var y = parseInt(vals[0])
      var x = parseInt(vals[1])
      const [endY, endX] = finishNode.split(',')
      if (y < parseInt(endY)) {
        y++
      } else if (y > parseInt(endY)) {
        y--
      } else if (x < parseInt(endX)) {
        x++
      } else if (x > parseInt(endX)) {
        x--
      } else if (y === 5 && x === 45) {
        found = true
      }
      board[y][x].inRoute = true
      setBoard([...board])
      backTrack(`${y},${x}`)
    }, 20);
  }

  function search(r: number, c: number) {
    var stop = false
    var start = `${r},${c}`
    function bfs(r: number, c: number, delay: number, distance: number) {
      setTimeout(() => {
        delay += 20
        var curNode = `${r},${c}`
        if (curNode === finishNode) {
          stop = true
          // board[r][c].checked = true
          board[r][c].distance = 'Finish'
          setTimeout(() => backTrack(start), 1000)
        }
        const outOfBounds = r < 0 || c < 0 || r === ROWS || c === COLS
        if (outOfBounds || stop || board[r][c].checked) return
        board[r][c] = {
          ...board[r][c],
          checked: true,
          start: start === curNode,
          distance: start === curNode ? 0 : distance
        }
        const newBoard = [...board]
        setBoard(newBoard)
        bfs(r + 1, c, delay, distance + 1)
        bfs(r, c + 1, delay, distance + 1)
        bfs(r - 1, c, delay, distance + 1)
        bfs(r, c - 1, delay, distance + 1)
      }, delay);
    }
    let delay = 0
    bfs(r, c, delay, 0)
  }

  function onClick(e: { type: string }, r: number, c: number) {
    if (e.type === 'click') {
      search(r, c)
    } else if (e.type === 'contextmenu') {
      board[r][c].end = true
      setFinishNode(`${r},${c}`)
      setBoard([...board])
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
