const errorTypes = require('../constants/errorTypes');
const statusCodes = require('../constants/statusCodes');

const map = {
  [errorTypes.INVALID_FIELDS]: statusCodes.BAD_REQUEST,
};

const mapTypeToStatus = (type) => map[type] || 500;

module.exports = mapTypeToStatus;
