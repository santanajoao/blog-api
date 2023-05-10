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

module.exports = {
  login,
  createUser,
};
