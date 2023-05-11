const { Category } = require('../models');

const createCategory = async (categoryName) => {
  const newCategory = await Category.create({
    name: categoryName,
  });

  return { type: null, message: newCategory };
};

module.exports = {
  createCategory,
};
