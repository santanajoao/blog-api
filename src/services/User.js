const validations = require('./validations');
const { generateToken } = require('../auth/JWT');

const login = async (email, password) => {
  const error = validations.validateEmailAndPassword(email, password);
  if (error.type) return error;

  const token = generateToken({ email });

  return { type: null, message: token };
};

module.exports = {
  login,
};
