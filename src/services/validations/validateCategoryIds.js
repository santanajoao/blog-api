const { Op } = require('sequelize');
const { Category } = require('../../models');

const validateCategoryIds = async (idList) => {
  const existentCategories = await Category.count({
    where: { id: { [Op.or]: idList } },
  });
  if (existentCategories !== idList.length) {
    return {
      type: 'INVALID_FIELD',
      message: 'one or more "categoryIds" not found',
    };
  }

  return { type: null, message: '' };
};

module.exports = validateCategoryIds;
