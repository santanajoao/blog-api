const { Op } = require('sequelize');
const { BlogPost, PostCategory, User, Category } = require('../models');
const validations = require('./validations');
const { POST_NOT_FOUND } = require('../constants/errorTypes');

const createPost = async ({
  authenticationToken, title, content, categoryIds,
}) => {
  const tokenError = validations.validateAuthToken(authenticationToken);
  if (tokenError.type) return tokenError;

  const categoryError = await validations.validateCategoryIds(categoryIds);
  if (categoryError.type) return categoryError;
  
  const user = await User.findOne({
    where: { email: { [Op.eq]: tokenError.message.email } },
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
    return { type: POST_NOT_FOUND, message: 'Post does not exist' };
  }

  return { type: null, message: post };
};

const editPost = async ({ authorizationToken, postId, title, content }) => {
  const tokenError = validations.validateAuthToken(authorizationToken);
  if (tokenError.type) return tokenError;

  const permissionError = await validations
    .validateUser(authorizationToken, postId);
  if (permissionError.type) return permissionError;

  await BlogPost.update(
    { title, content },
    { where: { id: postId } },
  );

  return findPostById(authorizationToken, postId);
};

const deletePost = async (authorizationToken, postId) => {
  const tokenError = validations.validateAuthToken(authorizationToken);
  if (tokenError.type) return tokenError;

  const permissionError = await validations
    .validateUser(authorizationToken, postId);
  if (permissionError.type) return permissionError;

  const deletedPosts = BlogPost.destroy({
    where: { id: postId },
  });
  if (deletedPosts === 0) {
    return { type: POST_NOT_FOUND, message: 'Post does not exist' };
  }

  return { type: null, message: '' };
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  editPost,
  deletePost,
};
