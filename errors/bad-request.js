const { StatusCodes } = require("http-status-codes");
const HousesAPIError = require("./houses-api");

class BadRequestError extends HousesAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
