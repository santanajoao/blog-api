const express = require('express');
const { UserController } = require('../controllers');

const router = express.Router();

router.post('/', UserController.handlePostUser);

module.exports = router;
