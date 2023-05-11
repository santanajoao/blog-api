const { BAD_REQUEST } = require('../constants/statusCodes');

const checkForCategoryIds = (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return res.status(BAD_REQUEST).json({
      message: 'Some required fields are missing',
    });
  } 

  next();
};

module.exports = checkForCategoryIds;
