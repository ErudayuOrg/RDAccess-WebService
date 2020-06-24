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

userModel.getUserById = userId => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOne({userId}))
        .then(response =>  response);
}

userModel.getProjectsByUserId = userId => {
    return collection.getCollection(COLLECTION_NAME.PROJECTS)
        .then(model => model.find({team:userId}))
        .then(response =>  response);
}

userModel.getAllUserId = (userId) => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.find({userId:{$regex: userId}},{userId:1,_id:0}).limit(5))
        .then(response =>  response);
}

module.exports = userModel;