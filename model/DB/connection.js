const mongoose = require("mongoose");
const {COLLECTION_NAME} = require('../../keys/constant');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

mongoose.set("useCreateIndex", true);
mongoose.set('useFindAndModify', false);

const userObj = {
    "userId":{ type:String, required:true },
    "userName": { type: String, required: true },
    "userPassword": { type: String, required: true },
    "userDesignation": { type: String, required: true },
    "userDepartment": { type: String},
    "projects": {
        type: [{ type: String, required: true }],
        default: []
    }
};

const projectObj = {
    "projectId":{ type:String, required:true },
    "team": { 
        type: [{ type: String, required: true }],
        required: true
    },
    "projectDepartment": { 
        type: [{ type: String, required: true }],
        required: true
    },
    "projectLab": { 
        type: [{ type: String, required: true }],
        required: true
    },
    "projectTitle": { type: String, required: true },
    "projectSummary": { type: String, required: true },
    "views":{ type: Number, default: 0 },
};

const connection = {};
const usersSchema = new Schema(userObj, { collection: "Users", timestamps: true });
const projectsSchema = new Schema(projectObj, { collection: "Projects", timestamps: true });


connection.getCollection = collectionName => {
    return mongoose.connect("mongodb://localhost:27017/RandDDB", 
    {useNewUrlParser: true, useUnifiedTopology: true}).then((db) => {
        switch (collectionName){
            case COLLECTION_NAME.USERS: return db.model(collectionName, usersSchema);
            case COLLECTION_NAME.PROJECTS: return db.model(collectionName, projectsSchema);
        }
    }).catch(err => {
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    });
}

module.exports = connection;