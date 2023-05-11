const { Op } = require('sequelize');
const { BlogPost } = require('../../models');

const validateCategoryIds = async (idList) => {
  const existentCategories = await BlogPost.findAndCountAll({
    where: { id: { [Op.or]: idList } },
  });

  if (existentCategories.length !== idList.length) {
    return {
      type: 'INVALID_FIELD',
      message: 'one or more "categoryIds" not found',
    };
  }

  return { type: null, message: '' };
};

module.exports = validateCategoryIds;
