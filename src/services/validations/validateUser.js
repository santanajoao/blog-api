const { BlogPost, User } = require('../../models');
const { validateToken } = require('../../auth/JWT');
const { INVALID_TOKEN } = require('../../constants/errorTypes');

const validateUser = async (token, postId) => {
  const { data } = validateToken(token);
  const user = await User.findOne({
    where: { email: data.email },
  });
  
  const post = await BlogPost.findByPk(postId);
  if (user.id !== post.userId) {
    return { type: INVALID_TOKEN, message: 'Unauthorized user' };
  }
  return { type: null, message: '' };
};

module.exports = validateUser;
