const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const Game = require('../models/Game');

const PROTO_PATH = path.join(__dirname, '../grpc/chess.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const chessProto = grpc.loadPackageDefinition(packageDefinition).chess;

const server = new grpc.Server();

server.addService(chessProto.ChessService.service, {
  CreateGame: async (call, callback) => {
    const newGame = new Game({ players: [], moves: [] });
    await newGame.save();
    callback(null, newGame);
  },
  JoinGame: async (call, callback) => {
    const { gameId, player } = call.request;
    const game = await Game.findById(gameId);
    if (game) {
      game.players.push(player);
      await game.save();
      callback(null, game);
    } else {
      callback(new Error('Game not found'));
    }
  },
  MakeMove: async (call, callback) => {
    const { gameId, from, to, piece } = call.request;
    const game = await Game.findById(gameId);
    if (game) {
      game.moves.push({ from, to, piece });
      await game.save();
      callback(null, game);
    } else {
      callback(new Error('Game not found'));
    }
  }
});

const startGrpcServer = (port) => {
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(`Failed to bind gRPC server: ${error.message}`);
      return;
    }
    console.log(`gRPC server running at http://0.0.0.0:${port}`);
    server.start();
  });
};

module.exports = startGrpcServer;
