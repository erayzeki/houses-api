const { StatusCodes } = require("http-status-codes");
const HousesAPIError = require("./houses-api");

class NotFoundError extends HousesAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
