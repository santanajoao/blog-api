const { BAD_REQUEST } = require('../constants/statusCodes');

const checkForEmailAndPassword = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).json({
      message: 'Some required fields are missing',
    });
  }

  next();
};

module.exports = checkForEmailAndPassword;
