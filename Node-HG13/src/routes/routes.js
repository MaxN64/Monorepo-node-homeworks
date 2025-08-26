const { Router } = require("express");
const router = Router();

const { Tag, Article } = require("../models");

router.post("/tags", async (req, res) => {
  try {
    const tag = await Tag.create({ name: req.body.name });
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/articles", async (req, res) => {
  try {
    const { title, content = "", tags = [] } = req.body;
    const article = await Article.create({ title, content, tags });

    if (tags.length) {
      await Tag.updateMany(
        { _id: { $in: tags } },
        { $addToSet: { articles: article._id } }
      );
    }

    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/articles/:id/tags/:tagId", async (req, res) => {
  try {
    const { id, tagId } = req.params;
    const [article, tag] = await Promise.all([
      Article.findByIdAndUpdate(
        id,
        { $addToSet: { tags: tagId } },
        { new: true }
      ),
      Tag.findByIdAndUpdate(
        tagId,
        { $addToSet: { articles: id } },
        { new: true }
      ),
    ]);
    res.json({ article, tag });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/articles/:id/tags/:tagId", async (req, res) => {
  try {
    const { id, tagId } = req.params;
    const [article, tag] = await Promise.all([
      Article.findByIdAndUpdate(id, { $pull: { tags: tagId } }, { new: true }),
      Tag.findByIdAndUpdate(tagId, { $pull: { articles: id } }, { new: true }),
    ]);
    res.json({ article, tag });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/articles/:id", async (req, res) => {
  try {
    const doc = await Article.findById(req.params.id).populate("tags").lean();
    res.json(doc);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

router.get("/tags/:id", async (req, res) => {
  try {
    const doc = await Tag.findById(req.params.id).populate("articles").lean();
    res.json(doc);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
