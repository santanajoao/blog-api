const { BAD_REQUEST } = require('../constants/statusCodes');

const checkForPost = (req, res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(BAD_REQUEST).json({
      message: 'Some required fields are missing',
    });
  } 

  next();
};

module.exports = checkForPost;
