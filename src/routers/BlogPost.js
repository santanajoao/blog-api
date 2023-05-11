const express = require('express');
const { checkForAuth, checkForPost } = require('../middlewares');
const { BlogPostController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  checkForAuth,
  checkForPost,
  BlogPostController.handlePostBlogPost,
);

module.exports = router;
