const {TenantService} = require("../services/tenant.service");
const {TENANT_ERRORS} = require("../common/enums/errors.enum");
const logger = require("../common/logger/logger");

const tenantService = new TenantService;

const getAllTenant = async (req, res, next) => {
    try {
        logger.info(`Trying to get all tenants`);
        const tenants = await tenantService.getAllTenant()
        if (!tenants) {
            logger.error(`Failed to get tenants`);
            throw new ServerError(404, TENANT_ERRORS.NOT_FOUND_TENANT)
        }
        logger.info(`Tenants is successfully gotten`);
        return tenants
    } catch (err) {
        logger.error(`Failed to retrieve all tenants`);
        throw new ServerError(err.errorCode, err.message)
    }
}

const getTenant = async (req, res, next) => {
    try {
        logger.info(`Tenant to get tenant by id: ${req.params.id}`);
        const tenant = await tenantService.getTenant(req.params)
        if (!tenant) {
            logger.error(`Failed to get tenant by id: ${req.params.id}`);
            throw new ServerError(407, TENANT_ERRORS.NOT_FOUND_TENANT)
        }
        logger.info(`Tenant with id ${req.params.id} is successfully gotten `);
        return tenant
    } catch (err) {
        logger.error(`Failed to get tenant by id: ${req.params.id}`);
        throw new ServerError(err.errorCode, err.message)
    }
}

const updateTenant = async (req, res, next) => {
    try {
        logger.info(`Trying to update tenant by name: ${req.params.id}`);
        const updateTenant = await tenantService.updateTenant(req.params.id, req.body)
        logger.info(`Tenant with name: ${req.body.name} is successfully update`);
        return updateTenant;
    } catch (err) {
        logger.error(`Failed to update tenant by id: ${req.params.id}`);
        throw new ServerError(err.errorCode, err.message)
    }
}

const createTenant = async (req, res, next) => {
    try {
        logger.info(`Trying to create tenant by name: ${req.body.name}`);
        const newTenant = await tenantService.createTenant(req.body)
        logger.info(`Tenant with name: ${req.body.name} is successfully created`);
        return newTenant
    } catch (err) {
        logger.error(`Failed to create tenant by id: ${req.params.name}`);
        throw new ServerError(err.errorCode, err.message)
    }
}

const deleteTenant = async (req, res, next) => {
    try {
        logger.info(`Trying to delete tenant by id: ${req.params.id}`);
        const defaultElm = await tenantService.deleteTenant(req.params)
        logger.info(`Tenant with id: ${req.params.id} is successfully deleted`);
        return defaultElm
    } catch (err) {
        logger.error(`Tenant deletion failed by id: ${req.params.id}`);
        throw new ServerError(err.errorCode, err.message)
    }
}


const searchTenants = async (req, res, next) => {
    try {
        logger.info(`Start search by appointment : ${JSON.stringify(req.body)}`);
        const tenants = await tenantService.searchTenant(req.body.search)
        if (!tenants) {
            logger.error(`Failed to find tenant`);
            throw new ServerError(407, TENANT_ERRORS.NOT_FOUND_TENANT)
        }
        logger.info(`Found the required tenant`);
        return tenants
    } catch (err) {
        logger.error(`Failed to find tenant`);
        throw new ServerError(err.errorCode, err.message)
    }
}


module.exports = {
    getAllTenant,
    getTenant,
    updateTenant,
    createTenant,
    deleteTenant,
    searchTenants
}
