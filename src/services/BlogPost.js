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
  
  const userId = tokenError.message.id;
  const newPost = await BlogPost.create({ title, content, userId });

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
        model: User, as: 'user', attributes: { exclude: 'password' } },
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
  const post = await findPostById(authorizationToken, postId);
  if (post.type) return post;

  const permissionError = await validations
    .validateUser(authorizationToken, postId);
  if (permissionError.type) return permissionError;

  await BlogPost.destroy({
    where: { id: postId },
  });

  return { type: null, message: '' };
};

const searchPost = async (authorizationToken, searchTerm) => {
  const error = validations.validateAuthToken(authorizationToken);
  if (error.type) return error;
  console.error('chegou aqui');
  const posts = BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { content: { [Op.like]: `%${searchTerm}%` } },
      ],
    },
  });

  return { type: null, message: posts };
};

module.exports = {
  createPost,
  findAllPosts,
  findPostById,
  editPost,
  deletePost,
  searchPost,
};
