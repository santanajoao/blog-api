const { Op } = require('sequelize');
const { BlogPost, PostCategory, User } = require('../models');
const validations = require('./validations');

const createPost = async ({
  authenticationToken, title, content, categoryIds,
}) => {
  const authError = validations.validateAuth(authenticationToken);
  if (authError.type) return authError;

  const categoryError = await validations.validateCategoryIds(categoryIds);
  if (categoryError.type) return categoryError;
  
  const user = await User.findOne({
    where: { email: { [Op.eq]: authError.message.email } },
  });
  const newPost = await BlogPost.create({ title, content, userId: user.id });

  const postsCategories = categoryIds
    .map((categoryId) => ({ categoryId, postId: newPost.id }));
  await PostCategory.bulkCreate(postsCategories);

  return { type: null, message: newPost };
};

module.exports = {
  createPost,
};
