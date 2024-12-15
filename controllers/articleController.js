import Article from '../models/Article.js';

// @desc   Create a new article
// @route  POST /api/articles
export const createArticle = async (req, res) => {
  try {
    const { title, content, summary, visualizationUrl } = req.body;

    const newArticle = new Article({
      title,
      content,
      summary,
      visualizationUrl,
    });

    await newArticle.save();
    res.status(201).json({ message: 'Article created successfully', article: newArticle });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Get all articles
// @route  GET /api/articles
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Get an article by ID
// @route  GET /api/articles/:id
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Update an article by ID
// @route  PUT /api/articles/:id
export const updateArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const article = await Article.findByIdAndUpdate(id, updatedData, { new: true });

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article updated successfully', article });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Delete an article by ID
// @route  DELETE /api/articles/:id
export const deleteArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await Article.findByIdAndDelete(id);

    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};