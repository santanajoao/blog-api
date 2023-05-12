const { OK, CREATED, NO_CONTENT } = require('../constants/statusCodes');
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

const handleGetUser = async (req, res) => {
  const token = req.get('Authorization');
  const id = Number(req.params.id);

  const { type, message } = await UserService.findUserById(token, id);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(OK).json(message);
};

const handleDeleteOwnUser = async (req, res) => {
  const token = req.get('Authorization');
  const { type, message } = await UserService.deleteUser(token);
  if (type) {
    return res.status(mapTypeToStatus(type)).json({ message });
  }
  res.status(NO_CONTENT).end();
};

module.exports = {
  handlePostLogin,
  handlePostUser,
  handleGetAllUsers,
  handleGetUser,
  handleDeleteOwnUser,
};
