const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const validations = require('./validations');

const createPost = async ({
  authenticationToken, title, content, categoryIds,
}) => {
  const authError = validations.validateAuthToken(authenticationToken);
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

const findAllPosts = async (authorizationToken) => {
  const error = validations.validateAuthToken(authorizationToken);
  if (error.type) return error;

  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: 'password' },
      },
      { model: Category, as: 'categories' },
    ],
  });
  return { type: null, message: posts };
};

const findPostById = async (authorizationToken, postId) => {
  const error = validations.validateAuthToken(authorizationToken);
  if (error.type) return error;

  const post = await BlogPost.findByPk(postId, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: 'password' },
      },
      { model: Category, as: 'categories' },
    ],
  });
  if (!post) {
    return { type: 'POST_NOT_FOUND', message: 'Post does not exist' };
  }

  return { type: null, message: post };
};

const editPost = async ({ authorizationToken, postId, title, content }) => {
  const tokenError = validations.validateAuthToken(authorizationToken);
  if (tokenError.type) return tokenError;

  const permissionError = validations.validateUser(authorizationToken, postId);
  if (permissionError.type) return permissionError;

  const updatedPost = BlogPost.update({
    title, content,
  }, {
    where: { id: postId },
  });

  return { type: null, message: updatedPost };
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  editPost,
};
