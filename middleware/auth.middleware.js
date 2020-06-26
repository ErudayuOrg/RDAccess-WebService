const jwt = require('jsonwebtoken');
const {ApiError} = require('../objectCreator/objectCreator');
const {JWT_KEY} = require('../keys/constant');

const userAuth = (req,res,next)=>{
   try {
        const token = req.headers.authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, JWT_KEY.SECRET);
        req.auth = {userId: decoded.userId, userDesignationCode: decoded.userDesignationCode};
        next();
    } catch(error){
        throw new ApiError("Authentication Failed", 401);
    }
};

const updateAuth = (req,res,next) =>{ 
    try{
        console.log(req)
        if( req.auth.userDesignationCode !== 'ADMIN') throw 'Forbidden Access';
        next();
    }catch(error){
        throw new ApiError(error, 403);
    }
};


module.exports = {userAuth, updateAuth};