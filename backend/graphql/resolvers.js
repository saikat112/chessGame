const Game = require('../models/Game');

const resolvers = {
  Query: {
    games: async () => await Game.find(),
    game: async (_, { id }) => await Game.findById(id),
  },
  Mutation: {
    createGame: async () => {
      const newGame = new Game({ players: [] });
      return await newGame.save();
    },
    joinGame: async (_, { id, player }) => {
      let game = await Game.findById(id);
      if (!game) throw new Error('Game not found');

      if (game.players.length >= 2) {
        // Game is full, find or create a new game
        game = await Game.findOne({ status: 'ongoing', players: { $size: 1 } });
        if (!game) {
          // If no partially filled game is found, create a new game
          game = new Game({ players: [player] });
        } else {
          game.players.push(player);
        }
      } else {
        game.players.push(player);
      }
      return await game.save();
    },
    makeMove: async (_, { id, from, to, piece }) => {
      const game = await Game.findById(id);
      if (!game) throw new Error('Game not found');
      game.moves.push({ from, to, piece });
      return await game.save();
    },
  },
};

module.exports = resolvers;
