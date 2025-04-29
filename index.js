const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/Article");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://abdalazeezkhdeir:paTWK4onFKeurymt@my-cluster.er7ebsd.mongodb.net/?retryWrites=true&w=majority&appName=My-Cluster"
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Connection error:", err));

app.post("/article", async (req, res) => {
  const { title, contact } = req.body;
  if (!title || !contact)
    return res.status(400).json({ error: "Title and contact are required" });

  try {
    const article = await Article.create({
      title: title.trim(),
      content: contact.trim(),
      DateOfArticle: Date.now(),
    });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/article", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/article/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/article/:id", async (req, res) => {
  const { title, contact } = req.body;
  if (!title || !contact)
    return res.status(400).json({ error: "Title and contact are required" });

  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title.trim(), content: req.body.contact.trim() },
      { new: true }
    );
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/article/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json({ message: "Deleted successfully", article });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
