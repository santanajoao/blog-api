const { BlogPost } = require('../../models');
const { validateToken } = require('../../auth/JWT');
const { INVALID_TOKEN } = require('../../constants/errorTypes');

const validateUser = async (token, postId) => {
  const { data } = validateToken(token);
  const post = await BlogPost.findByPk(postId);

  if (data.id !== post.userId) {
    return { type: INVALID_TOKEN, message: 'Unauthorized user' };
  }
  return { type: null, message: '' };
};

module.exports = validateUser;
