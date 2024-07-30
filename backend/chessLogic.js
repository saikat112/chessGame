class Piece {
    constructor(color, type) {
      this.color = color;
      this.type = type;
    }
  
    getColor() {
      return this.color;
    }
  
    getType() {
      return this.type;
    }
  
    isValidMove(startX, startY, endX, endY, board) {
      throw new Error('isValidMove should be implemented by subclasses');
    }
  }
  
  class Pawn extends Piece {
    constructor(color) {
      super(color, 'P');
    }
  
    isValidMove(startX, startY, endX, endY, board) {
      const direction = (this.color === 'WHITE') ? -1 : 1;
  
      if (startY === endY) {
        if (endX === startX + direction && board[endX][endY] === null) {
          return true;
        }
        if (endX === startX + 2 * direction && board[startX + direction][endY] === null && board[endX][endY] === null) {
          if ((this.color === 'WHITE' && startX === 6) || (this.color === 'BLACK' && startX === 1)) {
            return true;
          }
        }
      }
      if (Math.abs(startY - endY) === 1 && endX === startX + direction) {
        if (board[endX][endY] !== null && board[endX][endY].getColor() !== this.color) {
          return true;
        }
      }
      return false;
    }
  }
  
  class Knight extends Piece {
    constructor(color) {
      super(color, 'N');
    }
  
    isValidMove(startX, startY, endX, endY, board) {
      const dx = Math.abs(startX - endX);
      const dy = Math.abs(startY - endY);
      return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
    }
  }
  
  class Bishop extends Piece {
    constructor(color) {
      super(color, 'B');
    }
  
    isValidMove(startX, startY, endX, endY, board) {
      if (Math.abs(startX - endX) !== Math.abs(startY - endY)) return false;
  
      const xDirection = (endX - startX) / Math.abs(endX - startX);
      const yDirection = (endY - startY) / Math.abs(endY - startY);
      let x = startX + xDirection;
      let y = startY + yDirection;
  
      while (x !== endX && y !== endY) {
        if (board[x][y] !== null) return false;
        x += xDirection;
        y += yDirection;
      }
      return true;
    }
  }
  
  class Rook extends Piece {
    constructor(color) {
      super(color, 'R');
    }
  
    isValidMove(startX, startY, endX, endY, board) {
      if (startX !== endX && startY !== endY) return false;
  
      if (startX === endX) {
        const yDirection = (endY - startY) / Math.abs(endY - startY);
        for (let y = startY + yDirection; y !== endY; y += yDirection) {
          if (board[startX][y] !== null) return false;
        }
      } else {
        const xDirection = (endX - startX) / Math.abs(endX - startX);
        for (let x = startX + xDirection; x !== endX; x += xDirection) {
          if (board[x][startY] !== null) return false;
        }
      }
      return true;
    }
  }
  
  class Queen extends Piece {
    constructor(color) {
      super(color, 'Q');
    }
  
    isValidMove(startX, startY, endX, endY, board) {
      if (startX === endX || startY === endY) {
        return new Rook(this.color).isValidMove(startX, startY, endX, endY, board);
      } else if (Math.abs(startX - endX) === Math.abs(startY - endY)) {
        return new Bishop(this.color).isValidMove(startX, startY, endX, endY, board);
      }
      return false;
    }
  }
  
  class King extends Piece {
    constructor(color) {
      super(color, 'K');
    }
  
    isValidMove(startX, startY, endX, endY, board) {
      const dx = Math.abs(startX - endX);
      const dy = Math.abs(startY - endY);
      return dx <= 1 && dy <= 1;
    }
  }
  
  class Board {
    constructor() {
      this.squares = Array.from({ length: 8 }, () => Array(8).fill(null));
      this.initializeBoard();
    }
  
    clearBoard() {
      this.squares = Array.from({ length: 8 }, () => Array(8).fill(null));
    }
  
    initializeBoard() {
      this.clearBoard();
      this.initializePawns();
      this.initializeBackRow('WHITE', 7);
      this.initializeBackRow('BLACK', 0);
    }
  
    initializePawns() {
      for (let i = 0; i < 8; i++) {
        this.squares[1][i] = new Pawn('BLACK');
        this.squares[6][i] = new Pawn('WHITE');
      }
    }
  
    initializeBackRow(color, row) {
      this.squares[row][0] = new Rook(color);
      this.squares[row][1] = new Knight(color);
      this.squares[row][2] = new Bishop(color);
      this.squares[row][3] = new Queen(color);
      this.squares[row][4] = new King(color);
      this.squares[row][5] = new Bishop(color);
      this.squares[row][6] = new Knight(color);
      this.squares[row][7] = new Rook(color);
    }
  
    movePiece(startX, startY, endX, endY) {
      const piece = this.squares[startX][startY];
      if (piece && piece.isValidMove(startX, startY, endX, endY, this.squares)) {
        this.squares[endX][endY] = piece;
        this.squares[startX][startY] = null;
        return true;
      }
      return false;
    }
  }
  
  module.exports = {
    Piece,
    Pawn,
    Knight,
    Bishop,
    Rook,
    Queen,
    King,
    Board
  };
  