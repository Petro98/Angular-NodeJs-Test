class TenantService {
    tenantModel = require("../schema/tenant");

    async getTenant({id}) {
        return await this.tenantModel.findOne({_id: id}).exec();
    }

    async getAllTenant() {
        return this.tenantModel.find();
    }

    async updateTenant(id, payload) {
        return this.tenantModel.findOneAndUpdate({_id: id}, payload).exec();
    }

    async deleteTenant({id}) {
        return this.tenantModel.deleteOne({_id: id});
    }

    async createTenant(payload) {
        return this.tenantModel.create(payload);
    }

    async searchTenant(searchValue) {
        return this.tenantModel.find({'name': {$regex: searchValue} })
    }
}

module.exports = {TenantService};
