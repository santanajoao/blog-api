const express = require('express');
const { UserController } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', UserController.handlePostUser);
router.get('/', middlewares.checkForAuth, UserController.handleGetAllUsers);
router.get('/:id', middlewares.checkForAuth, UserController.handleGetUser);

module.exports = router;
