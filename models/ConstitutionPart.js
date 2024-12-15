import mongoose from 'mongoose';

const constitutionPart  = new mongoose.Schema({
  title: String,
  articles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article"}],
});

export default mongoose.model('constitutionPart', constitutionPart);
