const { CategoryService } = require('../services');
const { CREATED, OK } = require('../constants/statusCodes');
const mapTypeToStatus = require('../utils/mapTypeToStatus');

const handlePostCategory = async (req, res) => {
  const token = req.get('Authorization');
  const { name } = req.body;

  const { type, message } = await CategoryService.createCategory(token, name);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(CREATED).json(message);
};

const handleGetAllCategories = async (req, res) => {
  const token = req.get('Authorization');

  const { type, message } = await CategoryService.findAllCategories(token);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(OK).json(message);
};

module.exports = {
  handlePostCategory,
  handleGetAllCategories,
};
