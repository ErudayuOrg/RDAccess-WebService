const projectModel = require('../model/project.model');
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

projectService.getProjectById = projectId => {
    return projectModel.getProjectById(projectId)
        .then(response => {
            if(response) return response;
            throw new ApiError("Project not found", 404);
        });
}

module.exports = projectService;