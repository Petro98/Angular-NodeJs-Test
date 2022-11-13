const logger = require('../common/logger/logger');
const {comparePassword} = require('../common/functions/auth.functions');
const {AUTH_ERRORS} = require('../common/enums/errors.enum');
const {SERVER_ERROR} = require("../common/enums/errors.enum");
const {UsersService} = require("../services/user.service")
const {AuthService} = require("../services/auth.service");


const usersService = new UsersService();
const authService = new AuthService();

const signUp = async (req, res, next) => {

    try {
        const createdUser = await usersService.createUser(req.body);
        logger.info(`User is successfully created`);

        delete createdUser.password;
        return createdUser;
    } catch (e) {
        console.error(e);
        if (e.code === 11000) {
            throw new ServerError(409, AUTH_ERRORS.FIELD_EXIST(e));
        }
    }
    throw new ServerError(404, SERVER_ERROR.BAD_REQUEST);
}


const login = async (req, res, next) => {
    const {email, password} = req.body;
    logger.info(`Trying to login in`);
    const user = await usersService.findUser(email);
    if (!user) {
        logger.error(`Failed to login`);
        throw new ServerError(403, AUTH_ERRORS.NOT_FOUND_USER)
    }
    logger.info(`Password verification`);
    if (!(await comparePassword(password, user.password))) {
        logger.info(`Failed to verificate password`);
        throw new ServerError(401, AUTH_ERRORS.WRONG_AUTH_DATA)
    }

    const accessToken = await authService.login(user);
    if (!accessToken) {
        throw new ServerError(403, AUTH_ERRORS.TOKEN_NOT_CREATED)
    }
    logger.info(`Generated token: ${accessToken}`);
    return {...accessToken, username: user.email}
}

const logout = async (req, res, next) => {
    const accessToken = await authService.login({email: '', id: ''});
    logger.info(`Generated token: ${accessToken}`);
    return accessToken
}

module.exports = {
    signUp,
    login,
    logout
}
