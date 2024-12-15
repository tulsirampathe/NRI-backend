import ConstitutionPart from "../models/ConstitutionPart.js";

// @desc   Get all constitution parts
export const getAllConstitutionParts = async (req, res) => {
  try {
    const parts = await ConstitutionPart.find().populate("articles");
    res.status(200).json(parts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Get a specific constitution part by ID
export const getConstitutionPartById = async (req, res) => {
  try {
    const part = await ConstitutionPart.findById(req.params.id).populate(
      "articles"
    );
    if (!part) {
      return res.status(404).json({ message: "Constitution Part not found" });
    }
    res.status(200).json(part);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getConstitutionPartByTitle = async (req, res) => {
  const { title } = req.params; // Access route parameter

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    const part = await ConstitutionPart.findOne({ title }).populate("articles");

    if (!part) {
      return res.status(404).json({ message: "Constitution Part not found" });
    }

    res.status(200).json(part);
  } catch (error) {
    console.error("Error fetching Constitution Part:", error);
    res.status(500).json({ error: error.message });
  }
};

// @desc   Create a new constitution part
export const createConstitutionPart = async (req, res) => {
  const { title } = req.body; // Only title is accepted
  try {
    const newPart = new ConstitutionPart({
      title,
      articles: [], // Initialize articles as an empty array
    });

    const savedPart = await newPart.save();
    res.status(201).json({
      message: "Constitution Part created successfully",
      part: savedPart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Update a constitution part by ID
export const updateConstitutionPartById = async (req, res) => {
  const { title, articles } = req.body;
  try {
    // Validate referenced articles
    if (articles) {
      const existingArticles = await Article.find({ _id: { $in: articles } });
      if (existingArticles.length !== articles.length) {
        return res
          .status(400)
          .json({ message: "One or more articles are invalid" });
      }
    }

    const updatedPart = await ConstitutionPart.findByIdAndUpdate(
      req.params.id,
      { title, articles },
      { new: true }
    ).populate("articles");

    if (!updatedPart) {
      return res.status(404).json({ message: "Constitution Part not found" });
    }

    res.status(200).json({
      message: "Constitution Part updated successfully",
      part: updatedPart,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc   Delete a constitution part by ID
export const deleteConstitutionPartById = async (req, res) => {
  try {
    const deletedPart = await ConstitutionPart.findByIdAndDelete(req.params.id);
    if (!deletedPart) {
      return res.status(404).json({ message: "Constitution Part not found" });
    }
    res.status(200).json({ message: "Constitution Part deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
