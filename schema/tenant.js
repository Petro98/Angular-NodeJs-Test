const mongoose = require("mongoose");

const tenantSchema = new mongoose.Schema({
    name: {type: String, default: ''},
    phone: {type: String, default: ''},
    address: {type: String, default: ''},
    financial_debt: {type: String, default: ''}
});

module.exports = mongoose.model("tenant", tenantSchema);
