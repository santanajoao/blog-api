const { default: validator } = require('validator');
const { User } = require('../../models');
const { INVALID_FIELDS, USER_IN_USE } = require('../../constants/errorTypes');

const validateNameAndPassword = (displayName, password) => {
  const MIN_NAME_LENGTH = 8;
  const MIN_PASSWORD_LENGTH = 6;

  if (displayName.length < MIN_NAME_LENGTH) {
    return {
      type: INVALID_FIELDS,
      message: '"displayName" length must be at least 8 characters long',
    };
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return {
      type: INVALID_FIELDS,
      message: '"password" length must be at least 6 characters long',
    };
  }

  return { type: null, message: '' };
};

const validateNewUser = async ({ displayName, email, password }) => {
  const lengthError = validateNameAndPassword(displayName, password);
  if (lengthError.type) return lengthError;

  if (!validator.isEmail(email)) {
    return { type: 'INVALID_VALUE', message: '"email" must be a valid email' };
  }

  const user = await User.findOne({ where: { email } });
  if (user) {
    return { type: USER_IN_USE, message: 'User already registered' };
  }

  return { type: null, message: '' };
};

module.exports = validateNewUser;
