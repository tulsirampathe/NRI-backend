import mongoose from 'mongoose';

const userGameProgressSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true },
  gameId: { type: String, ref: 'Game', required: true },
  score: Number,
  lastPlayed: Date,
  completed: Boolean,
  playCount: Number,
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model('UserGameProgress', userGameProgressSchema);
