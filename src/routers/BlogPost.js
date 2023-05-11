const express = require('express');
const middlewares = require('../middlewares');
const { BlogPostController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  middlewares.checkForAuth,
  middlewares.checkForPost,
  BlogPostController.handlePostBlogPost,
);

router.get('/', middlewares.checkForAuth, BlogPostController.handleGetAllPosts);
router.get('/:id', middlewares.checkForAuth, BlogPostController.handleGetPost);

module.exports = router;
