const { Category } = require('../models');
const validations = require('./validations');

const createCategory = async (athorizationToken, categoryName) => {
  const error = validations.validateAuth(athorizationToken);
  if (error.type) return error;

  const newCategory = await Category.create({
    name: categoryName,
  });

  return { type: null, message: newCategory };
};

module.exports = {
  createCategory,
};
