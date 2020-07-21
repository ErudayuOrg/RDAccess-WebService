const jwt = require('jsonwebtoken');

const userModel = require('../model/user.model');
const { ApiError } = require('../objectCreator/objectCreator');
const { JWT_KEY } = require('../keys/constant');
const serviceUtils = require('../utils/service.util');

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

userService.createUser = userDetails => {
    return userModel.getUserById(userDetails.userId)
        .then(response => {
            if(response) throw new ApiError("UserId already exist",400);
             return true;
        })
        .then( canCreate => {
            if(canCreate){
                return userModel.createUser(userDetails)
                .then(response => ({message: `User #${response.userId} created successfully`}) )
            }
        })
} 

userService.loginUser = async loginDetails  => {
    try{
        const userData = await userModel.getUserById(loginDetails.userId);
        if(!userData) throw 401;
        else{
            const isNotMatch = loginDetails.userPassword.localeCompare(userData.userPassword);
            if (isNotMatch)  throw 401; 
            else {
                const message = `Hi ${userData.userName}`;
                const payload = { userId: userData.userId, userDesignationCode: userData.userDesignationCode };
                const token = jwt.sign(payload, JWT_KEY.SECRET);
                const user = {
                    userId: userData.userId,
                    userName: userData.userName,
                    userDesignation: userData.userDesignation,
                    userDesignationCode: userData.userDesignationCode,
                    userDepartmentId: userData.userDepartmentId
                }
                return { message, token, user };
            }
        }
    }
    catch(statusCd){
        throw new ApiError("Invalid username or password", statusCd);
    }
}

userService.getUserDetails = userId => {
    return userModel.getUserById(userId)
        .then(response =>{
            if(response) return response;
            throw new ApiError("User not found", 404);
        });
} 

userService.getProjectsByUserId = userId => {
    return userModel.getProjectsByUserId(userId)
        .then(response =>{
            if(response) {
                return serviceUtils.mapProjectForUser(response);
            }
            throw new ApiError("User not found", 404);
        });
} 

userService.getPublicationsByUserId = userId => {
    return userModel.getPublicationsByUserId(userId)
        .then(response =>{
            if(response) {
                return serviceUtils.mapPublicationForUser(response);
            }
            throw new ApiError("User not found", 404);
        });
} 

userService.getMatchingUserId = userId => {
    return userModel.getAllUserId(userId)
        .then(response => {
            if(response) return response.map(data => `${data.userId}-${data.userName}`);
            throw new ApiError("Cannot search", 500);
        });
} 

userService.updatePassword = (passwords,userId) => {
    return userModel.getUserById(userId)
        .then(response => {
            if(response){
                if(response.userPassword !== passwords.oldPassword) throw new ApiError("Incorrect old password", 400);
                return true;
            }
        })
        .then(isoldPasswordCorrect => {
            if(isoldPasswordCorrect){
               return userModel.updatePassword(passwords.newPassword, userId)
               .then( (response) =>{
                   if(response.userPassword === passwords.newPassword)
                        return {message: `Password updated successfully`}
                    throw new ApiError("Password not updated", 500);
                });
            }
        })
}; 


module.exports = userService;