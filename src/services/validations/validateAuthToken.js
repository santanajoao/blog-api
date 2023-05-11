const { validateToken } = require('../../auth/JWT');

const validateAuthToken = (authorizationToken) => {
  const data = validateToken(authorizationToken);

  if (!data) {
    return { type: 'INVALID_TOKEN', message: 'Expired or invalid token' };
  }

  return { type: null, message: data.data };
};

module.exports = validateAuthToken;
