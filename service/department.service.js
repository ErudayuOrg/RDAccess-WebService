const departmentModel = require('../model/department.model');
const projectModel = require('../model/project.model');

const { ApiError } = require('../objectCreator/objectCreator');

const departmentService = {};

departmentService.insertScript = () => {
    return departmentModel.deleteAllDepartments()
        .then( response => {
            if(response.deletedCount === 0) throw new ApiError("No departments deleted", 404);
            return;
        })
        .then(() => departmentModel.insertSampleDepartments())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert projects",500);
        })
};

departmentService.getAllDepartments = () => {
    return departmentModel.getAllDepartments()
        .then(response => {
            if(response) return response;
            throw new ApiError("Departments not found", 404);
        });
};

departmentService.getDepartmentSnapshot = () => {
    return departmentModel.getAllDepartments()
        .then(response => {
            if(response){
               return response.map( dept => ({departmentId:dept.departmentId, departmentName:dept.departmentName}) );
            }
            throw new ApiError("Departments not found", 404);
        })
        .then(departments =>{
            return projectModel.getCountByStatus('Ongoing').then( ongoingProjects =>{
                return departments.map(dept => {
                    return {onGoingCount : ongoingProjects.filter(proj => proj.projectDepartment[0] === dept.departmentId).length,
                            ...dept}  
                })
            });
        })
        .then(departments =>{
            return projectModel.getCountByStatus('Completed').then( completedProjects =>{
                return departments.map(dept => {
                    return {completedCount : completedProjects.filter(proj => proj.projectDepartment[0] === dept.departmentId).length,
                            ...dept}  
                }) 
            });
        })
        .then(departments =>{
            return projectModel.getTeams().then( projectTeams =>{
                return departments.map(dept => {
                   let departmentProjects =  [...projectTeams.filter(proj =>proj.projectDepartment[0] === dept.departmentId)]; 
                   let uniqueContributors = new Set([].concat(...[...departmentProjects.map(proj => proj.team )]));
                    return {contributors : [...uniqueContributors].length, ...dept}  
                });
            });
        });
};

departmentService.getOverAllSnapshot = () => {
    return projectModel.getCountByStatus('Ongoing')
        .then(ongoingProjects => ({ongoingProjects : ongoingProjects.length}) )
        .then( projects =>{
            return projectModel.getCountByStatus('Completed').then(completedProjects =>{
                projects.completedProjects = completedProjects.length;
                return projects;
            })
        })
        .then( projects=>{
            return projectModel.getTeams().then(projectTeams =>{
                let uniqueContributors = new Set([].concat(...[...projectTeams.map(proj => proj.team)]))
                projects.contributors = [...uniqueContributors].length;
                return projects;
            })
        })
        .then( projects => {
            return departmentModel.getAllDepartments().then( departments =>{
                projects.researchLabs = [].concat(...[...departments.map( dept => dept.researchLab)]).length;
                return projects;
            })
        })
};


departmentService.createDepartment = departmentDetail => {
    return departmentModel.createDepartment(departmentDetail)
        .then(response => {
            if(response) return {message: `department #${response.departmentId} created successfully`};
            throw new ApiError("Department not created", 500);
        });
};

departmentService.createResearchLab = (researchLabDetail, departmentId) => {
    return departmentModel.createResearchLab(researchLabDetail, departmentId)
        .then(response => {
            if(response) {
                return {message: `Research lab created successfully`};
            }
            throw new ApiError("Research lab not created", 500);
        });
};

module.exports = departmentService;