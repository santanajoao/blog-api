const { User } = require('../../models');
const errors = require('../../constants/errorTypes');

const validateEmailAndPassword = async (email, password) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user || password !== user.password) {
    return { type: errors.INVALID_FIELD, message: 'Invalid fields' };
  }

  return { type: null, message: '' };
};

module.exports = validateEmailAndPassword;
