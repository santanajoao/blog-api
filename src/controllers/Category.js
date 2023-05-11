const { CategoryService } = require('../services');
const { CREATED } = require('../constants/statusCodes');
const mapTypeToStatus = require('../utils/mapTypeToStatus');

const handlePostCategory = async (req, res) => {
  const token = req.get('Authorization');
  const { name } = req.body;

  const { type, message } = await CategoryService.createCategory(token, name);
  console.log(message);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(CREATED).json(message);
};

module.exports = {
  handlePostCategory,
};
