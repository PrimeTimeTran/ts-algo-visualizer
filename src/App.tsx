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
}

function Game() {
  var board: {}[][] = [];
  for (var i = 0; i < 8; i++) {
    board[i] = [];
    for (var j = 0; j < 8; j++) {
      const someObj: node = { id: `${i}, ${j}` };
      board[i][j] = someObj;
    }
  }

  console.log(board)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {board.map((row, i) => (
            <div key={i}>
              {row.map((col, j) => (
                <span key={j}>{col}</span>
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
