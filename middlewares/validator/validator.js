const {body, validationResult} = require('express-validator');
const {AUTH_ERRORS} = require("../../common/enums/errors.enum");

const authRoutsValidator = [
    body('password')
        .trim()
        .isLength({min: 6}),
    body('email')
        .isEmail(),
    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new ServerError(400, AUTH_ERRORS.VALIDATION_FAILED);
        }
        next()
    }
];

module.exports = {
    authRoutsValidator
}
