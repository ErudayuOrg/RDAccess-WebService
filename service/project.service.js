const projectModel = require('../model/project.model');
const serviceUtils = require('../utils/service.util');
const {ID_PREFIX} = require('../keys/constant');

const { ApiError } = require('../objectCreator/objectCreator');

const projectService = {};

projectService.insertScript = () => {
    return projectModel.deleteAllprojects()
        .then( response => {
            if(response.deletedCount === 0) throw new ApiError("No projects deleted", 404);
            return;
        })
        .then(() => projectModel.insertSampleProjects())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert projects",500);
        })
}

projectService.getProjectsByLabId = labId => {
    return projectModel.getProjectsByLabId(labId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Project not found", 404);
        });
}

projectService.getProjectById = projectId => {
    return projectModel.getProjectById(projectId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Project not found", 404);
        });
}

projectService.createNewProject = projectDetails => {
    return projectModel.getAllProjects().then( allProjects => allProjects.length )
        .then( count => serviceUtils.generateId(ID_PREFIX.PROJECT,count) )
        .then( projectId =>{
            //ui should send createdAt date
            let history =[{
                            commitMessage:'Project created',
                            userId : projectDetails.team[0],
                            updatedDate : projectDetails.createdAt
                        }];
            projectDetails.history = history;
            return projectModel.createNewProject({projectId, ...projectDetails})
                .then(response => {
                    if(response) return response;
                    throw new ApiError("Project not Added. Please! try Later ", 500);
                });
        })
        .then( response =>{
            return {message :`Project #${response.projectId} created successfully`};
        });
}

projectService.updateProjectById = (projectUpdates,projectId) => {
    return projectModel.getProjectHistoryById(projectId)
    .then( historyResponse => {
        projectUpdates.history = [projectUpdates.history, ...historyResponse.history];
        return projectUpdates;
        })
        .then( projectDetails => projectModel.updateProjectById(projectDetails, projectId))
        .then(response => {
            if(response) return {response, message :`Project #${response.projectId} updated successfully`};
            throw new ApiError("Project not updated", 403);
        });
}

module.exports = projectService;