import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: String,
  description: String,
  difficulty: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Game', gameSchema);
