const { OK, CREATED } = require('../constants/statusCodes');
const { UserService } = require('../services');
const mapTypeToStatus = require('../utils/mapTypeToStatus');

const handlePostLogin = async (req, res) => {
  const { email, password } = req.body;

  const { type, message } = await UserService.login(email, password);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(OK).json({ token: message });
};

const handlePostUser = async (req, res) => {
  const { type, message } = await UserService.createUser(req.body);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(CREATED).json({ token: message });
};

const handleGetAllUsers = async (req, res) => {
  const token = req.get('Authorization');

  const { type, message } = await UserService.findAllUsers(token);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(OK).json(message);
};

module.exports = {
  handlePostLogin,
  handlePostUser,
  handleGetAllUsers,
};
