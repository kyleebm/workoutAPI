const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./customAPI')

class UnathenticatedError extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCodes = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnathenticatedError