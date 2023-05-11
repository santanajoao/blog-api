const { BAD_REQUEST } = require('../constants/statusCodes');

const checkForName = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }

  next();
};

module.exports = checkForName;
