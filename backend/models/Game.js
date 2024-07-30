const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moveSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  piece: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false
});

const gameSchema = new Schema({
  players: [{
    type: String,
    required: true
  }],
  moves: [moveSchema],
  status: {
    type: String,
    enum: ['ongoing', 'finished'],
    default: 'ongoing'
  },
  result: {
    type: String,
    enum: ['white', 'black', 'draw', 'pending'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
