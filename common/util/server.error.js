
class ServerError extends Error {
    constructor(errorCode, message) {
        super(message);
        this.errorCode = errorCode
        this.name = "ServerError";
    }
}

global.ServerError = ServerError;

module.exports = {
    ServerError
}
