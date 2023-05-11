const { Category } = require('../models');
const validations = require('./validations');

const createCategory = async (authorizationToken, categoryName) => {
  const error = validations.validateAuth(authorizationToken);
  if (error.type) return error;

  const newCategory = await Category.create({
    name: categoryName,
  });

  return { type: null, message: newCategory };
};

const findAllCategories = async (authorizationToken) => {
  const error = validations.validateAuth(authorizationToken);
  if (error.type) return error;

  return Category.findAll();
};

module.exports = {
  createCategory,
  findAllCategories,
};
