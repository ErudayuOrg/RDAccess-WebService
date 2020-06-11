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

module.exports = userModel;