type Move =
  | "A0" | "A1" | "A2"
  | "B0" | "B1" | "B2"
  | "C0" | "C1" | "C2";

type AreAllMovesUnique<Moves extends Move[]> =
  Moves extends [infer First, ...infer Rest]
    ? First extends Rest[number]
      ? `Error: ${First extends string ? First : ""} is repeated!`
      : AreAllMovesUnique<Rest extends Move[] ? Rest : never>
    : true;

type XMovies = 0 | 2 | 4 | 6 | 8; // >:3
type OMoves = 1 | 3 | 5 | 7 | 9;

type RenderPosition<Position extends Move, Moves extends Move[]> =
  Position extends Moves[XMovies] ? "X" :
  Position extends Moves[OMoves] ? "O" :
  "*";

type CheckWinLine<Moves extends Move[], A extends Move, B extends Move, C extends Move> =
  [A, B, C] extends Moves[XMovies][] | Moves[OMoves][] & infer Winner
    ? `Player ${Winner extends Moves[XMovies][] ? "X" : "O"} wins!`
    : false;

type TicTacToe<Moves extends Move[]> =
  AreAllMovesUnique<Moves> extends string & infer ErrorMessage
    ? ErrorMessage
    : {
      _: ["0", "1", "2"];
      A: [
        RenderPosition<"A0", Moves>,
        RenderPosition<"A1", Moves>,
        RenderPosition<"A2", Moves>,
      ];
      B: [
        RenderPosition<"B0", Moves>,
        RenderPosition<"B1", Moves>,
        RenderPosition<"B2", Moves>,
      ];
      C: [
        RenderPosition<"C0", Moves>,
        RenderPosition<"C1", Moves>,
        RenderPosition<"C2", Moves>,
      ];
      message:
        CheckWinLine<Moves, "A0", "A1", "A2"> extends string & infer Msg ? Msg :
        CheckWinLine<Moves, "B0", "B1", "B2"> extends string & infer Msg ? Msg :
        CheckWinLine<Moves, "C0", "C1", "C2"> extends string & infer Msg ? Msg :

        CheckWinLine<Moves, "A0", "B0", "C0"> extends string & infer Msg ? Msg :
        CheckWinLine<Moves, "A1", "B1", "C1"> extends string & infer Msg ? Msg :
        CheckWinLine<Moves, "A2", "B2", "C2"> extends string & infer Msg ? Msg :

        CheckWinLine<Moves, "A0", "B1", "C2"> extends string & infer Msg ? Msg :
        CheckWinLine<Moves, "A2", "B1", "C0"> extends string & infer Msg ? Msg :

        Moves["length"] extends 9
          ? "Game finished with a draw!"
          : `Player ${Moves["length"] extends XMovies ? "X" : "O"}'s turn`;
    };

// =================================================================================
type Game = TicTacToe<[
  "A0",
  "B0",
  "C0",
  "B1",
  "A1",
  "C1",
  "B2",
  "A2",
  "C2",
]>;
