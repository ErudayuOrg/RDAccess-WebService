const collection = require('./DB/connection');
const { COLLECTION_NAME } = require('../keys/constant');

const fundingModel = {};

fundingModel.getAllFundings = () => {
    return collection.getCollection(COLLECTION_NAME.FUNDINGS)
        .then(model => model.find().sort({createdAt: -1}))
        .then(response =>  response);
}

fundingModel.createNewFunding = fundingDetails => {
    return collection.getCollection(COLLECTION_NAME.FUNDINGS)
        .then(model => model.create(fundingDetails))
        .then(response =>  response);
}

fundingModel.getFundingDetailById = fundingId => {
    return collection.getCollection(COLLECTION_NAME.FUNDINGS)
        .then(model => model.findOne({fundingId}))
        .then(response =>  response);
}

fundingModel.getFundingHistoryById = fundingId =>{
    return collection.getCollection(COLLECTION_NAME.FUNDINGS)
    .then(model => model.findOne({fundingId},{history:1, _id:0}))
    .then(response =>  response);
}

fundingModel.updateFundingDetailById = (fundingDetails, fundingId) => {
    return collection.getCollection(COLLECTION_NAME.FUNDINGS)
        .then(model => model.findOneAndUpdate({fundingId},{$set:{...fundingDetails}},{new:true}))
        .then(response =>  response);
}


/*===Funding-project modal===*/

fundingModel.getAllFundingProjects = () => {
    return collection.getCollection(COLLECTION_NAME.FUNDING_PROJECTS)
        .then(model => model.find().sort({createdAt: -1}))
        .then(response =>  response);
}

fundingModel.getFundingProjectById = fundingProjectId => {
    return collection.getCollection(COLLECTION_NAME.FUNDING_PROJECTS)
        .then(model => model.findOne({fundingProjectId}))
        .then(response =>  response);
}

fundingModel.addReceivedFundingProject = receivedFundingProjectDetails => {
    return collection.getCollection(COLLECTION_NAME.FUNDING_PROJECTS)
        .then(model => model.create(receivedFundingProjectDetails))
        .then(response =>  response);
}

fundingModel.getFPHistoryById = fundingProjectId =>{
    return collection.getCollection(COLLECTION_NAME.FUNDING_PROJECTS)
    .then(model => model.findOne({fundingProjectId},{history:1, _id:0}))
    .then(response =>  response);
}

fundingModel.updateFundingProjectById = (fundingProject, fundingProjectId) => {
    return collection.getCollection(COLLECTION_NAME.FUNDING_PROJECTS)
        .then(model => model.findOneAndUpdate({fundingProjectId},{$set:{...fundingProject}},{new:true}))
        .then(response =>  response);
}

module.exports = fundingModel;
