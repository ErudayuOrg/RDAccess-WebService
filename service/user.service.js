const userModel = require('../model/user.model');
const { ApiError } = require('../objectCreator/objectCreator');

const userService ={};

userService.insertScript = () => {
    return userModel.deleteAllusers()
        .then( response => {
            if(response.deletedCount === 0) throw new ApiError("No users deleted", 404);
            return;
        })
        .then(() => userModel.insertSampleUsers())
        .then(response => {
            if (response.length > 0) return response.length
            throw new ApiError("Can't insert users",500);
        })
}

userService.getUserDetails = userId => {
    return userModel.getUserById(userId)
        .then(response =>{
            if(response) return response;
            throw new ApiError("User not found", 404);
        });
} 


module.exports = userService;