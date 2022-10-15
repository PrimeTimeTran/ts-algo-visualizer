import { useEffect, useState, useRef } from 'react'

import Square from './Square'
import Navbar from './NavBarr'

import useKeyPress from '../hooks/useKeyPress';

import { node } from '../types/square'

const ROWS = 20
const COLS = 50
const START_NODE = '10,5'
const FINISH_NODE = '10,45'

function createNode(rc: string, i: number, j: number) {
  const cur: node = {
    row: i,
    col: j,
    id: rc,
    inRoute: false,
    checked: false,
    distance: Infinity,
    end: rc === FINISH_NODE,
    start: rc === START_NODE,
  };
  return cur
}

function getBoard() {
  console.log('New board')
  var board: node[][] = [];
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      const rc = `${i},${j}`
      const cur = createNode(rc, i, j)
      board[i][j] = cur;
    }
  }
  return board;
}

const matrix = getBoard()

function Game() {
  const [board, setBoard] = useState(matrix)
  const [found, setFound] = useState(false)
  const foundRef = useRef(found);


  const [finishNode, setFinishNode] = useState(FINISH_NODE)

  const onRefresh = () => {
    setBoard(getBoard())
    setFinishNode(FINISH_NODE)
  };

  useEffect(() => {
    console.log(found)
  }, [found])

  useKeyPress(['r'], onRefresh);

  function backTrack(start: string) {
    setTimeout(() => {
      console.log('backtrack')
      if (foundRef) return
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
        setFound(true)
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
        console.log('BFS')
        delay += 20
        var curNode = `${r},${c}`
        if (curNode === finishNode) {
          stop = true
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
    <>
      <Navbar />
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
    </>
  );
}

export default Game