const { User } = require('../models');
const validations = require('./validations');
const { generateToken, validateToken } = require('../auth/JWT');

const login = async (email, password) => {
  const error = await validations.validateEmailAndPassword(email, password);
  if (error.type) return error;

  const token = generateToken({ email });

  return { type: null, message: token };
};

const createUser = async ({ displayName, email, password, image }) => {
  const error = await validations.validateNewUser({
    displayName, email, password,
  });
  if (error.type) return error;

  await User.create({
    displayName, email, password, image,
  });

  const token = generateToken({ displayName, email, image });

  return { type: null, message: token };
};

const findAllUsers = async (authorizationToken) => {
  const data = validateToken(authorizationToken);
  if (!data) {
    return { type: 'INVALID_TOKEN', message: 'Expired or invalid token' };
  }

  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return { type: null, message: users };
};

module.exports = {
  login,
  createUser,
  findAllUsers,
};
