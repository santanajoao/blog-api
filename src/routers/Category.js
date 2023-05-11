const express = require('express');
const middlewares = require('../middlewares');
const { CategoryController } = require('../controllers');

const router = express.Router();

router.post(
  '/',
  middlewares.checkForAuth,
  middlewares.checkForName,
  CategoryController.handlePostCategory,
);

router.get(
  '/',
  middlewares.checkForAuth,
  CategoryController.handleGetAllCategories,
);

module.exports = router;
