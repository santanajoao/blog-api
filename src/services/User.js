const { User } = require('../models');
const validations = require('./validations');
const { generateToken } = require('../auth/JWT');

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
  const error = validations.validateAuthToken(authorizationToken);
  if (error.type) return error;

  const users = await User.findAll({ attributes: { exclude: 'password' } });
  return { type: null, message: users };
};

const findUserById = async (authorizationToken, userId) => {
  const error = validations.validateAuthToken(authorizationToken);
  if (error.type) return error;

  const user = await User.findByPk(userId, {
    attributes: { exclude: 'password' },
  });
  if (!user) {
    return { type: 'USER_NOT_FOUND', message: 'User does not exist' };
  }

  return { type: null, message: user };
};

module.exports = {
  login,
  createUser,
  findAllUsers,
  findUserById,
};
