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

module.exports = {
  generateToken,
};
