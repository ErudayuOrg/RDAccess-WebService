const collection = require('./DB/connection');
const sampleUsers = require('../data/users');
const { COLLECTION_NAME } = require('../keys/constant');

const usersModel = {};

usersModel.deleteAllusers = () => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.deleteMany())
        .then(response => response);
}

usersModel.insertSampleUsers = () => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.insertMany(sampleUsers))
        .then(response => response);
}

usersModel.getUserDetails = userCredential => {
    return collection.getCollection(COLLECTION_NAME.USERS)
        .then(model => model.findOne(userCredential))
        .then(response =>  response);
}

module.exports = usersModel;