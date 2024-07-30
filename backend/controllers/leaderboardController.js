// controllers/leaderboardController.js
const User = require('../models/User'); // Assuming you have a User model

exports.getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find().sort({ wins: -1 }).limit(10); // Assuming 'wins' field exists
    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
