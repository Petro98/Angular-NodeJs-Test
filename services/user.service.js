const {bcryptPassword} = require('../common/functions/auth.functions');

class UsersService {
    UserModel = require("../schema/user");

    constructor() {
    }

    async findUser(email) {
        return await this.UserModel.findOne({email}).exec();
    }

    async createUser({email, password, username}) {
        const decryptedPassword = await bcryptPassword(password);
        return await this.UserModel.create({
            email, password: decryptedPassword, username
        })
    }
}

module.exports = {UsersService};
