const Game = require('../models/Game');
const Game = require('../models/Game');


exports.createGame = async (req, res) => {
  try {
    const newGame = new Game({ players: [], moves: [] });
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.joinGame = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { player } = req.body;
    const game = await Game.findById(gameId);
    if (game) {
      game.players.push(player);
      await game.save();
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.makeMove = async (req, res) => {
  try {
    const { gameId } = req.params;
    const { from, to, piece } = req.body;
    const game = await Game.findById(gameId);
    if (game) {
      const move = { from, to, piece };
      game.moves.push(move);
      await game.save();
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getGameHistory = async (req, res) => {
  try {
    const { gameId } = req.params;
    const game = await Game.findById(gameId);
    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: 'Game not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

