const soap = require('soap');
const fs = require('fs');
const path = require('path');
const Game = require('../models/Game');

const service = {
  ChessService: {
    ChessPort: {
      CreateGame: async (args, callback) => {
        const newGame = new Game({ players: [], moves: [] });
        await newGame.save();
        callback(null, newGame);
      },
      JoinGame: async (args, callback) => {
        const { gameId, player } = args;
        const game = await Game.findById(gameId);
        if (game) {
          game.players.push(player);
          await game.save();
          callback(null, game);
        } else {
          callback(new Error('Game not found'));
        }
      },
      MakeMove: async (args, callback) => {
        const { gameId, from, to, piece } = args;
        const game = await Game.findById(gameId);
        if (game) {
          game.moves.push({ from, to, piece });
          await game.save();
          callback(null, game);
        } else {
          callback(new Error('Game not found'));
        }
      }
    }
  }
};

const xml = fs.readFileSync(path.join(__dirname, '../soap/chess.wsdl'), 'utf8');

const startSoapServer = (app, server) => {
  soap.listen(server, '/wsdl', service, xml);
  console.log('SOAP server running on /wsdl');
};

module.exports = startSoapServer;
