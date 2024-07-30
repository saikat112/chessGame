// src/types/chess.d.ts

declare module 'chess.js' {
  export interface Move {
    color: 'b' | 'w';
    from: string;
    to: string;
    flags: string;
    piece: string;
    san: string;
    captured?: string;
    promotion?: string;
  }

  export interface ChessInstance {
    move(move: { from: string; to: string; promotion?: string }): Move | null;
    undo(): Move | null;
    history(options?: { verbose?: boolean }): Move[];
    fen(): string;
    game_over(): boolean;
    reset(): void;
  }

  export class Chess implements ChessInstance {
    constructor(fen?: string);
    move(move: { from: string; to: string; promotion?: string }): Move | null;
    undo(): Move | null;
    history(options?: { verbose?: boolean }): Move[];
    fen(): string;
    game_over(): boolean;
    reset(): void;
  }
}

export type Piece = {
  type: string;
  color: string;
};
