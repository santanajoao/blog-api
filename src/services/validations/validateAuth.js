const { validateToken } = require('../../auth/JWT');

const validateAuth = (authorizationToken) => {
  const data = validateToken(authorizationToken);

  if (!data) {
    return { type: 'INVALID_TOKEN', message: 'Expired or invalid token' };
  }

  return { type: null, message: data.data };
};

module.exports = validateAuth;
