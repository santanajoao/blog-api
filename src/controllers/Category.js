const { CategoryService } = require('../services');
const { CREATED } = require('../constants/statusCodes');
const mapTypeToStatus = require('../utils/mapTypeToStatus');

const handlePostCategory = (req, res) => {
  const { name } = req.body;
  const { type, message } = CategoryService.createCategory(name);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(CREATED).json(message);
};

module.exports = {
  handlePostCategory,
};
