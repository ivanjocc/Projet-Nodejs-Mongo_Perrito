// controllers/positionController.js

const Position = require('../models/PositionModel');

// Function to get positions of friends
const getFriendsPositions = async (req, res, next) => {
  const userId = req.user.userId; // Extract userId from the authenticated user's token

  try {
    // Query the database to get positions of friends
    const positions = await Position.find({ userId: { $ne: userId } }, 'userId lat long');

    res.status(200).json(positions);
  } catch (error) {
    next(error);
  }
};

// Function to update the user's position
const updatePosition = async (req, res, next) => {
  const userId = req.user.userId; // Extract userId from the authenticated user's token
  const { lat, long } = req.body;

  try {
    // Update the user's position in the database
    await Position.findOneAndUpdate({ userId }, { lat, long }, { upsert: true });

    res.status(200).json({ message: 'Position updated successfully.' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFriendsPositions, updatePosition };
