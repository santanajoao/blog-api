const express = require('express');
const middlewares = require('../middlewares');
const { BlogPostController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  middlewares.checkForAuth,
  middlewares.checkForTitleAndContent,
  middlewares.checkForCategoryIds,
  BlogPostController.handlePostBlogPost,
);

router.get('/', middlewares.checkForAuth, BlogPostController.handleGetAllPosts);
router.get('/:id', middlewares.checkForAuth, BlogPostController.handleGetPost);

router.put(
  '/:id',
  middlewares.checkForAuth,
  middlewares.checkForTitleAndContent,
  BlogPostController.handlePutPost,
);

router.delete(
  '/:id',
  middlewares.checkForAuth,
  BlogPostController.handleDeletePost,
);

module.exports = router;
