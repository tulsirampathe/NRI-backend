import express from 'express';
import {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticleById,
  deleteArticleById,
} from '../controllers/articleController.js';

const router = express.Router();

// Routes for Article CRUD
router.post('/', createArticle);           // Create an article
router.get('/', getAllArticles);           // Get all articles
router.get('/:id', getArticleById);        // Get article by ID
router.put('/:id', updateArticleById);     // Update article by ID
router.delete('/:id', deleteArticleById);  // Delete article by ID

export default router;
