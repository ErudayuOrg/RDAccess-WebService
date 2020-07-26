const fundingModel = require('../model/funding.model');
const serviceUtils = require('../utils/service.util');

const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');

const fundingService = {};

fundingService.getAllFundingsSummary = () => {
    return fundingModel.getAllFundings()
        .then(response => {
            if(response) return response;
            throw new ApiError("Fundings not found", 404);
        });
}

fundingService.createNewFunding = fundingDetails => {
    return fundingModel.getAllFundings().then( allPublications => allPublications.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.FUNDING, count) )
        .then( fundingId =>{
            return fundingModel.createNewFunding({fundingId, ...fundingDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Funding not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {message :`Funding #${response.fundingId} created successfully`};
        });
}

fundingService.getFundingDetailById = fundingId => {
    return fundingModel.getFundingDetailById(fundingId)
        .then(response => {
            if(response) return response;    
            throw new ApiError("Funding not found", 404);
        });
}

fundingService.updateFundingDetailById = (fundingUpdates, fundingId) => {
    return fundingModel.getFundingHistoryById(fundingId)
    .then( historyResponse => {
        fundingUpdates.history = [fundingUpdates.history, ...historyResponse.history];
        return fundingUpdates;
        })
        .then( fundingDetails => fundingModel.updateFundingDetailById(fundingDetails, fundingId))
        .then(response => {
            if(response)
                return {response, message :`Funding #${response.fundingId} updated successfully`};
            throw new ApiError("Project not updated", 403);
        }) 
}
module.exports = fundingService;
