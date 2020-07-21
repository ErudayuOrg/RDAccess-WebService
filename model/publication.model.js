const collection = require('./DB/connection');
const samplePublications = require('../data/publications');
const { COLLECTION_NAME } = require('../keys/constant');

const publicationModel = {};

publicationModel.deleteAllPublications = () => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.deleteMany())
        .then(response => response);
}

publicationModel.insertSamplePublications = () => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.insertMany(samplePublications))
        .then(response => response);
}

publicationModel.getAllPublications = () => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.find())
        .then(response =>  response);
}

publicationModel.createNewPublication = publicationDetails => {
    return collection.getCollection(COLLECTION_NAME.PUBLICATIONS)
        .then(model => model.create(publicationDetails))
        .then(response =>  response);
}

module.exports = publicationModel;

