const { OK } = require('../constants/statusCodes');
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

module.exports = {
  handlePostLogin,
};
