require('./common/util/server.error');

const express = require('express');
const ENV = require('dotenv');
const cors = require("cors");



const app = express();

const node_env = require('./config/config.init')(ENV);
const router = require('./routes/index.router');
const logger = require('./common/logger/logger');

const {connectMongoBD} = require("./config/mongodb");

app.use(express.json({limit: '50mb'}));
app.use(cors())
app.use(router);


app.listen(process.env.PORT, onListening);

async function onListening() {
    await connectMongoBD()

    logger.info(`Server is running on port: ${process.env.PORT}`);
    logger.info(`Server is running in "${node_env}" mode!`);
}
