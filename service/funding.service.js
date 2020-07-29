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

fundingService.createNewFunding = (fundingDetails, userId) => {
    return fundingModel.getAllFundings().then( allFundings => allFundings.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.FUNDING, count) )
        .then( fundingId =>{
            let history =[{
                commitMessage:'Funding created',
                userId
            }];
            fundingDetails.history = history;
            return fundingModel.createNewFunding({fundingId, ...fundingDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Funding not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {fundingId: response.fundingId, message :`Funding #${response.fundingId} created successfully`};
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


/*===Funding-project modal===*/

fundingService.getFundingProjectById = fundingProjectId => {
    return fundingModel.getFundingProjectById(fundingProjectId)
        .then(response => {
            if(response){
                let investigatorPromises = serviceUtils.mapIdToUser([response.investigator]);
                let coInvestigatorPromises = serviceUtils.mapIdToUser(response.coInvestigator);

                return Promise.all(investigatorPromises,coInvestigatorPromises).then(resolved =>{
                    response.investigator = resolved[0];
                    response.coInvestigator = resolved[1];
                    return response;    
                });
            }  
            throw new ApiError("Funding Project not found", 404);
        });
}

fundingService.addReceivedFundingProject = (fundingProjectDetails, userId) => {
    return fundingModel.getAllFundingProjects().then( allFundingProjects => allFundingProjects.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.FUNDING_PROJECTS, count) )
        .then( fundingProjectId =>{
            let history =[{
                commitMessage:'Funding created',
                userId
            }];
            fundingProjectDetails.history = history;
            return fundingModel.addReceivedFundingProject({fundingProjectId, ...fundingProjectDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Funding project not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {fundingProjectId: response.fundingProjectId, message :`Received Funding project #${response.fundingProjectId} created successfully`};
        });
}

fundingService.updateReceivedFPById = (fpUpdates, fundingProjectId) => {
    return fundingModel.getFPHistoryById(fundingProjectId)
    .then( historyResponse => {
        fpUpdates.history = [fpUpdates.history, ...historyResponse.history];
        return fpUpdates;
        })
        .then( fpUpdates => fundingModel.updateFundingProjectById(fpUpdates, fundingProjectId))
        .then(response => {
            if(response){
                    return {response, message :`Funding project #${response.fundingProjectId} updated successfully`};
            } 
            throw new ApiError("Funding project not updated", 403);
        }) 
}

module.exports = fundingService;
