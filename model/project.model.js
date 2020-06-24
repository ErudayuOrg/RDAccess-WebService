const collection = require('./DB/connection');
const sampleProjects = require('../data/projects');
const { COLLECTION_NAME } = require('../keys/constant');

const projectModel = {};

projectModel.deleteAllprojects = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.deleteMany())
        .then(response => response);
}

projectModel.insertSampleProjects = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.insertMany(sampleProjects))
        .then(response => response);
}

projectModel.getProjectsByLabId = labId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({projectLab:labId}))
        .then(response =>  response);
}

projectModel.getProjectById = projectId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOne({projectId}))
        .then(response =>  response);
}

projectModel.getAllProjects = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find())
        .then(response =>  response);
}

projectModel.createNewProject = (projectDetails) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.create(projectDetails))
        .then(response =>  response);
}
projectModel.updateProjectById = (projectDetails,projectId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({projectId},{$set:{...projectDetails}},{new:true}))
        .then(response =>  response);
}
module.exports = projectModel;