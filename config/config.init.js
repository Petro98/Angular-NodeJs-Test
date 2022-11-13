const NODE_ENV = require('../common/enums/environment.enum');

function initConfig(ENV) {
    const env = process.env.NODE_ENV || NODE_ENV.DEVELOPING;
    switch (env) {
        case NODE_ENV.DEVELOPING: {
            ENV.config({path:'./config/development.env'});
            break;
        }
        case NODE_ENV.TESTING: {
            ENV.config({path:'./config/testing.env'});
            break;
        }
        case NODE_ENV.PRODUCTION: {
            ENV.config({path:'./config/production.env'});
            break;
        }
    }
    return env;
}

module.exports = initConfig;
