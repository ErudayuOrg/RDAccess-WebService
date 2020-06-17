const departmentModel = require('../model/department.model');
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
}

departmentService.getAllDepartments = () => {
    return departmentModel.getAllDepartments()
        .then(response => {
            if(response) return response;
            throw new ApiError("Departments not found", 404);
        });
}

module.exports = departmentService;