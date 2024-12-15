import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  summary: String,
  visualizationUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Article', articleSchema);
