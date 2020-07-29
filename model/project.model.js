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
        .then(model => model.find({projectLab:labId}).sort({createdAt: -1}))
        .then(response =>  response);
}

projectModel.getProjectById = projectId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOne({projectId}))
        .then(response =>  response);
}

projectModel.getAllProjects = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find().sort({createdAt: -1}))
        .then(response =>  response);
}

projectModel.createNewProject = (projectDetails) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.create(projectDetails))
        .then(response =>  response);
}

projectModel.getProjectHistoryById = projectId =>{
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
    .then(model => model.findOne({projectId},{history:1, _id:0}))
    .then(response =>  response);
}

projectModel.updateProjectById = (projectDetails, projectId) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.findOneAndUpdate({projectId},{$set:{...projectDetails}},{new:true}))
        .then(response =>  response);
}

projectModel.getCountByStatus = (status) => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({status},{projectDepartment:1, _id:0}) )
        .then(response =>  response);
}

projectModel.getTeams = () => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({},{team:1,projectDepartment:1, _id:0}) )
        .then(response =>  response);
}

projectModel.getAllprojectNames = (projectTitle, userId) => {
    let projectRegex = new RegExp("^"+projectTitle, "i");
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({projectTitle:projectRegex, team:userId },
                                  {projectId:1,projectTitle:1,_id:0}).limit(5))
        .then(response =>  response);
}

module.exports = projectModel;