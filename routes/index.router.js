const express = require('express');

const app = module.exports = express();

const authRouter = require('./auth.route');
const tenantRouter = require('./tenant.route');

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/tenant', tenantRouter);

module.exports = app;
