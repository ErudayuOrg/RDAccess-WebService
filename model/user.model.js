const collection = require('./DB/connection');
const sampleUsers = require('../data/users');
const { COLLECTION_NAME } = require('../keys/constant');

const userModel = {};

userModel.deleteAllusers = () => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.deleteMany())
        .then(response => response);
}

userModel.insertSampleUsers = () => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.insertMany(sampleUsers))
        .then(response => response);
}

userModel.createUser = userDetails => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.create(userDetails))
        .then(response =>  response);
}

userModel.getUserById = userId => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOne({userId}))
        .then(response =>  response);
}

userModel.getProjectsByUserId = userId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({team:userId}).sort({createdAt: -1}))
        .then(response =>  response);
}

userModel.getPublicationsByUserId = userId => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.find({publisherId:userId}).sort({createdAt: -1}))
        .then(response =>  response);
}

userModel.getFundingProjectByUserId = userId => {
    return collection.getCollection(COLLECTION_NAME.FUNDING_PROJECTS)
        .then(model => model.find({ $or:[ {investigator:userId}, {coInvestigator:userId} ] }).sort({createdAt: -1}))
        .then(response =>  response);
}

userModel.getAllUserId = (userId) => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.find({userId:{$regex: userId}},{userId:1,userName:1,_id:0}).limit(5))
        .then(response =>  response);
}

userModel.updatePassword = (userPassword, userId) => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOneAndUpdate( {userId}, {$set:{userPassword}}, {new:true}) )
        .then(response =>  response);
};
module.exports = userModel;