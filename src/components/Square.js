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
    onContextMenu={(e) => props.onClick(e, r, c)}
  >
    {props.square.inRoute ? props.square.distance : props.square.start ? 'Start' : ''}
  </span>
}

export default Square