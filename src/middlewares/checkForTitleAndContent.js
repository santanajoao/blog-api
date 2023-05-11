const { BAD_REQUEST } = require('../constants/statusCodes');

const checkForTitleAndContent = (req, res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(BAD_REQUEST).json({
      message: 'Some required fields are missing',
    });
  }

  next();
};

module.exports = checkForTitleAndContent;