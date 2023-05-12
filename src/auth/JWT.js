const jwt = require('jsonwebtoken');

const generateToken = (data) => {
  const headers = {
    algorithm: 'HS256',
    expiresIn: '7d',
  };

  const payload = {
    data,
  };
  console.log(payload);
  return jwt.sign(payload, process.env.JWT_SECRET, headers);
};

const validateToken = (authorizationToken) => {
  try {
    const data = jwt.verify(authorizationToken, process.env.JWT_SECRET);
    return data;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  validateToken,
};
