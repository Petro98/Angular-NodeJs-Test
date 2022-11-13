const {jwtGenerator} = require("../common/functions/auth.functions");

class AuthService {

async login({email , id}) {
    const token = await jwtGenerator({email , userId: id});
    return {
        access_token: token
    };
}
}

module.exports = {AuthService};
