const mongoose = require("mongoose");

const logger = require("../common/logger/logger");


async function connectMongoBD() {
    try {
        await mongoose.connect(process.env.MONGODB)
        logger.info('Connected to Mongo');
    } catch (err) {
        logger.error('err to Mongo');
    }
}

module.exports = {connectMongoBD};
