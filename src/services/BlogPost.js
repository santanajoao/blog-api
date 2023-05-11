const { BlogPost, PostCategory } = require('../models');
const validations = require('./validations');

const createPost = async ({
  authenticationToken, title, content, categoryIds,
}) => {
  const authError = validations.validateAuth(authenticationToken);
  if (authError.type) return authError;

  const categoryError = validations.validateCategoryIds(categoryIds);
  if (categoryError.type) return categoryError;

  const newPost = await BlogPost.create({
    title, content, id: authError.data.id,
  });

  const postsCategories = categoryIds
    .map((categoryId) => ({ categoryId, postId: newPost.id }));
  await PostCategory.bulkCreate(postsCategories);

  return { type: null, message: newPost };
};

module.exports = {
  createPost,
};
