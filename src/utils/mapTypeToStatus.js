const errorTypes = require('../constants/errorTypes');
const statusCodes = require('../constants/statusCodes');

const map = {
  [errorTypes.USER_NOT_FOUND]: statusCodes.BAD_REQUEST,
  [errorTypes.WRONG_PASSWORD]: statusCodes.BAD_REQUEST,
};

const mapTypeToStatus = (type) => map[type] || 500;

module.exports = mapTypeToStatus;
