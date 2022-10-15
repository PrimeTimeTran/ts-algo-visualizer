export type node = {
  id: string;
  row: number;
  col: number;
  end: boolean;
  start: boolean;
  checked: boolean;
  inRoute: boolean;
  distance: typeof Infinity | string;
};

export type squareProps = {
  square: node;
  onClick: (arg1: { type: string }, arg2: number, arg3: number) => void;
};
