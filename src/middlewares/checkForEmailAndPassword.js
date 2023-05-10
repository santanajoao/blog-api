const { BAD_REQUEST } = require('../constants/statusCodes');
const isNullish = require('../utils/isNullish');

const checkForEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;

  if (isNullish(email) || isNullish(password)) {
    return res.status(BAD_REQUEST).json({
      message: 'Some required fields are missing',
    });
  }

  next();
};

module.exports = checkForEmailAndPassword;
