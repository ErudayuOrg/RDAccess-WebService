const usersModel = require('../model/users.model');
const { ApiError } = require('../objectCreator/objectCreator');

const userService ={};

userService.insertScript = () => {
    return usersModel.deleteAllusers()
        .then( response => {
            if(response.deletedCount === 0) throw new ApiError("No users deleted", 404);
            return;
        })
        .then(() => usersModel.insertSampleUsers())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert Products",500);
        })
}

userService.getUserDetails = userCredential => {
    return usersModel.getUserDetails(userCredential)
        .then(response => response);
} 


module.exports = userService;