const collection = require('./DB/connection');
const sampleDepartments = require('../data/departments');
const { COLLECTION_NAME } = require('../keys/constant');

const departmentModel = {};

departmentModel.deleteAllDepartments = () => {
    return collection.getCollection(COLLECTION_NAME.DEPARTMENTS)
        .then(model => model.deleteMany())
        .then(response => response);
};

departmentModel.insertSampleDepartments = () => {
    return collection.getCollection(COLLECTION_NAME.DEPARTMENTS)
        .then(model => model.insertMany(sampleDepartments))
        .then(response => response);
};

departmentModel.getAllDepartments = () => {
    return collection.getCollection(COLLECTION_NAME.DEPARTMENTS)
        .then(model => model.find())
        .then(response => response);
};

departmentModel.createDepartment = departmentDetail => {
    return collection.getCollection(COLLECTION_NAME.DEPARTMENTS)
        .then(model => model.create(departmentDetail))
        .then(response => response);
};

departmentModel.createResearchLab = (researchLabDetail, departmentId) => {
    return collection.getCollection(COLLECTION_NAME.DEPARTMENTS)
        .then(model => model.findOneAndUpdate(
            { departmentId },
            { "$push": { "researchLab":researchLabDetail } },
            { new: true, rawResult: true, runValidators: true }))
        .then(response => response);
};

module.exports = departmentModel;