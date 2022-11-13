const express = require('express');

const router = express.Router();

const tenantController = require('../controllers/tenant.controller');
const isAuth = require('../middlewares/auth/is.auth');
const {responseHandler} = require("../middlewares/response-handler/response-handler");

router.get('/all', responseHandler(tenantController.getAllTenant));

router.get('/:id', isAuth, responseHandler(tenantController.getTenant));

router.put('/:id', isAuth, responseHandler(tenantController.updateTenant));

router.delete('/:id', isAuth, responseHandler(tenantController.deleteTenant));

router.post('/', isAuth, responseHandler(tenantController.createTenant));

router.post('/search', isAuth, responseHandler(tenantController.searchTenants));

module.exports = router;
