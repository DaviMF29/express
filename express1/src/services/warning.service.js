const Warning = require("../models/Warning");

const findAllServices = () => {
    return Warning.find();
};

const createWarningService = async (body) => {
    return Warning.create(body);
};

module.exports = {findAllServices,createWarningService}

