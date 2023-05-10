const { User } = require('../../models');
const errors = require('../../constants/errorTypes');

const validateEmailAndPassword = async (email, password) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    return { type: errors.USER_NOT_FOUND, message: 'Invalid fields' };
  }

  if (password !== user.password) {
    return { type: errors.WRONG_PASSWORD, message: 'Invalid fields' };
  }
  
  return { type: null, message: '' };
};

module.exports = validateEmailAndPassword;
