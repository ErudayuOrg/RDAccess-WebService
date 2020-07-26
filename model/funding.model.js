const collection = require('./DB/connection');
const { COLLECTION_NAME } = require('../keys/constant');

const fundingModel = {};

fundingModel.getAllFundings = () => {
    return collection.getCollection(COLLECTION_NAME.FUNDINGS)
        .then(model => model.find())
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
module.exports = fundingModel;
