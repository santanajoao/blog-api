const { Category } = require('../models');
const validations = require('./validations');

const createCategory = async (authorizationToken, categoryName) => {
  const error = validations.validateAuthToken(authorizationToken);
  if (error.type) return error;

  const newCategory = await Category.create({
    name: categoryName,
  });

  return { type: null, message: newCategory };
};

const findAllCategories = async (authorizationToken) => {
  const error = validations.validateAuthToken(authorizationToken);
  if (error.type) return error;

  const categories = await Category.findAll();
  return { type: null, message: categories };
};

module.exports = {
  createCategory,
  findAllCategories,
};
