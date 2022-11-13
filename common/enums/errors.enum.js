const AUTH_ERRORS = {
    TOKEN_NOT_CREATED: "Failed to create accessToken",
    TOKEN_NOT_PROVIDED: "Access token not provided",

    WRONG_ACCESS_TOKEN: "Wrong access token",
    WRONG_AUTH_DATA: "Wrong password or email",
    NOT_FOUND_USER: "User not found",

    VALIDATION_FAILED: "Validation failed",

    FIELD_EXIST: (error) => {
        const fname = {
            name: Object.keys(error.keyValue)[0],
            value: Object.values(error.keyValue)[0]
        }
        return `User with ${fname.name} "${fname.value}" already exist.`
    }
}

const TENANT_ERRORS = {
    TENANT_NOT_CREATED: "Failed to create tenant",
    TENANT_NOT_DELETED: "Failed to delete tenant",
    NOT_FOUND_TENANT: "Tenant not found",
}

const SERVER_ERROR = {
    FAILED_TO_HASH_PASSWORD: "Failed to hash password",
    THE_USER_IS_ALREADY_REGISTERED: "User is already exist",
    NOT_FOUND: "Not found",
    BAD_REQUEST: 'Bad request'
}

module.exports = {
    AUTH_ERRORS,
    SERVER_ERROR,
    TENANT_ERRORS
}
