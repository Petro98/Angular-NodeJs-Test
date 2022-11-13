const jwt = require("jsonwebtoken");
const {AUTH_ERRORS} = require("../../common/enums/errors.enum");
const {ServerError} = require('../response-handler/response-handler');

const verifyToken = async (req, res, next) => {
    const accessToken = req.headers && req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    if (!accessToken) {
        throw new ServerError(401, AUTH_ERRORS.TOKEN_NOT_PROVIDED)
    }
    try {
        req.user = jwt.verify(accessToken, process.env.SECRET);
    } catch (err) {
        throw new ServerError(401, AUTH_ERRORS.WRONG_ACCESS_TOKEN);
    }
    return next();
};

module.exports = verifyToken;
