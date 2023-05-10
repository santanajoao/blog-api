const { UNAUTHORIZED } = require('../constants/statusCodes');

const checkForAuth = (req, res, next) => {
  const token = req.get('Authorization');
  if (!token) {
    return res.status(UNAUTHORIZED).json({
      message: 'Token not found',
    });
  }

  next();
};

module.exports = checkForAuth;
