const Warning = require("../models/Warning");

const createWarningService = async (body) => {
    return Warning.create(body);
};

module.exports = {createWarningService}

