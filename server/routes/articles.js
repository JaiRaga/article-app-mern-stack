const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Article = require('../models/Article');
const router = express.Router();

// create a article
router.post('/', auth, async (req, res) => {
  console.log('one', req.body);
  const article = new Article({
    ...req.body,
    owner: req.user._id,
  });

  console.log(req.user._id, article);

  try {
    console.log(1);
    await article.populate('owner');
    console.log(2);
    await article.save();
    console.log(3);
    res.status(201).send(article);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// get all articles
router.get('/', async (req, res) => {
  try {
    let articles = await Article.find().sort({ createdAt: -1 }).limit();

    if (!articles) return res.status(404).send('No articles found!');
    let len = articles.length;

    Promise.all(
      articles.map(async (article) => {
        await article.populate('owner');
        await article.save();
        return article;
      })
    )
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
    res.status(500).send('Server Error!');
  }
});

// get article by id
router.get('/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const article = await Article.findOne({ _id });

    if (!article) {
      res.status(404).send();
    }

    res.send(article);
  } catch (e) {
    console.log(e);
    res.status(500).send('Server Error');
  }
});

// update article
router.patch('/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const { title, description } = req.body;

  try {
    const article = await Article.findOne({ _id });

    if (!article) {
      res.status(404).send("Can't find the article!");
    }

    article.title = title || article.title;
    article.description = description || article.description;

    await article.populate('owner');

    await article.save();

    res.send(article);
  } catch (e) {
    res.status(500).send('Server Error');
  }
});

// delete a article by id
router.delete('/:id', auth, async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!article) return res.status(404).send("Article doesn't exists!");

    res.send(article);
  } catch (err) {
    res.status(500).send("Error! Couldn't perform the task!");
  }
});

// Like a article
router.patch('/like/:articleId', auth, async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.articleId });
    if (!article) {
      return res.status(404).send('Article Not Found');
    }

    if (
      article.likes.filter(
        (like) => like.owner.toString() === req.user._id.toString()
      ).length > 0
    ) {
      article.likes = article.likes.filter(
        (like) => like.owner.toString() !== req.user._id.toString()
      );

      await article.save();
      res.send(article.likes);
    }

    if (article.owner.toString() === req.user._id.toString())
      return res.status(400).send('Action not Permitted.');

    article.likes.push({ owner: req.user._id });
    await article.save();
    res.send(article.likes);
  } catch (err) {
    res.status(500).send("Error! Couldn't perform the task!");
  }
});

// Unlike a article
router.patch('/unlike/:id', auth, async (req, res) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    if (!article) {
      return res.status(404).send('Article Not Found');
    }

    article.likes = article.likes.filter(
      (like) => like.owner.toString() !== req.user._id.toString()
    );

    await article.save();
    res.send(article.likes);
  } catch (err) {
    res.status(500).send("Error! Couldn't Perform the task!");
  }
});

module.exports = router;
