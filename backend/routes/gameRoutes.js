// backend/routes/gameRoutes.js
const express = require('express');
const router = express.Router();
const Game = require('../models/Game');
const authenticate = require('../middleware/authenticate');

// Create a new game
router.post('/', authenticate, async (req, res) => {
  try {
    console.log('Creating new game');
    const newGame = new Game({ players: [req.user.userId] });
    await newGame.save();
    console.log('New game created:', newGame);
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Failed to create game' });
  }
});

// Join a game
router.post('/:id/join', authenticate, async (req, res) => {
  try {
    console.log('Joining game:', req.params.id);
    const gameId = req.params.id;
    const player = req.user.userId;
    const game = await Game.findById(gameId);
    if (!game) {
      console.log('Game not found:', gameId);
      return res.status(404).json({ error: 'Game not found' });
    }
    if (game.players.length >= 2) {
      return res.status(400).json({ error: 'Game already has 2 players' });
    }
    game.players.push(player);
    await game.save();
    console.log('Player joined game:', game);
    res.status(200).json(game);
  } catch (error) {
    console.error('Error joining game:', error);
    res.status(500).json({ error: 'Failed to join game' });
  }
});

// Make a move
router.post('/:id/move', authenticate, async (req, res) => {
  try {
    console.log('Making move:', req.params.id, req.body);
    const gameId = req.params.id;
    const { from, to, piece } = req.body;
    const game = await Game.findById(gameId);
    if (!game) {
      console.log('Game not found:', gameId);
      return res.status(404).json({ error: 'Game not found' });
    }
    game.moves.push({ from, to, piece });
    await game.save();
    console.log('Move made:', game);
    res.status(200).json(game);
  } catch (error) {
    console.error('Error making move:', error);
    res.status(500).json({ error: 'Failed to make move' });
  }
});

// Generate invite link
router.post('/:id/invite', authenticate, async (req, res) => {
  try {
    const gameId = req.params.id;
    const inviteLink = `http://localhost:3000/play/play-with-friend?gameId=${gameId}`;
    res.status(200).json({ inviteLink });
  } catch (error) {
    console.error('Error generating invite link:', error);
    res.status(500).json({ error: 'Failed to generate invite link' });
  }
});

// Delete all games
router.delete('/delete-all', authenticate, async (req, res) => {
  try {
    console.log('Deleting all games');
    await Game.deleteMany({});
    console.log('All games deleted');
    res.status(200).json({ message: 'All games deleted successfully' });
  } catch (error) {
    console.error('Error deleting games:', error);
    res.status(500).json({ error: 'Failed to delete games' });
  }
});

module.exports = router;
