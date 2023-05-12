const { User } = require('../../models');
const errors = require('../../constants/errorTypes');

const validateEmailAndPassword = async (email, password) => {
  const user = await User.findOne({
    where: { email },
  });

  if (!user || password !== user.password) {
    return { type: errors.INVALID_FIELD, message: 'Invalid fields' };
  }

  const { password: _password, ...$user } = user.dataValues;
  return { type: null, message: $user };
};

module.exports = validateEmailAndPassword;
