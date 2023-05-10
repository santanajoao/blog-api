const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  const headers = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  const payload = {
    data,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, headers);
};

const validateToken = (authorizationToken) =>
  jwt.verify(authorizationToken, process.env.JWT_SECRET);

module.exports = {
  generateToken,
  validateToken,
};
