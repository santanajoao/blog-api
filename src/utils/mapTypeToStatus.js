const errorTypes = require('../constants/errorTypes');
const statusCodes = require('../constants/statusCodes');

const map = {
  [errorTypes.INVALID_FIELD]: statusCodes.BAD_REQUEST,
  [errorTypes.USER_IN_USE]: statusCodes.CONFLICT,
};

const mapTypeToStatus = (type) => map[type] || 500;

module.exports = mapTypeToStatus;
