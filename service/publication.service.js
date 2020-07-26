const publicationModel = require('../model/publication.model');
const serviceUtils = require('../utils/service.util');

const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');

const publicationService = {};

publicationService.insertScript = () => {
    return publicationModel.deleteAllPublications()
        .then( response => {
            if(response.deletedCount === 0) throw new ApiError("No publications deleted", 404);
            return;
        })
        .then(() => publicationModel.insertSamplePublications())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert publications",500);
        })
}

publicationService.getAllpublicationsSummary = () => {
    return publicationModel.getAllPublications()
        .then(response => {
            if(response) {
                return serviceUtils.mapPublicationForUser(response);
            }
            throw new ApiError("Project not found", 404);
        });
}

publicationService.createNewPublication = publicationDetails => {
    return publicationModel.getAllPublications().then( allPublications => allPublications.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.PUBLICATION,count) )
        .then( publicationId =>{
            return publicationModel.createNewPublication({publicationId, ...publicationDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Publication not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {message :`Publication #${response.publicationId} added successfully`};
        });
}

module.exports = publicationService;
