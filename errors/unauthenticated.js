const { StatusCodes } = require("http-status-codes");
const HousesAPIError = require("./houses-api");

class UnauthenticatedError extends HousesAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthenticatedError;
