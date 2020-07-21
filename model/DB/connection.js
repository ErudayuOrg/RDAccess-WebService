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
    "userDesignationCode": { type: String, required: true },
    "userDepartment": { type: String},
    "userDepartmentId": { type: String}
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
    "status":{ type: String, default: 'Ongoing' },
    "referenceLink": { 
        type: [{ type: String, required: true }],
        default:[]
    },
    "keywords": { 
        type: [{ type: String, required: true }],
        default:[]
    },
    "projectContent": { 
        type: [{
            "subHeading":{ type: String, required: true },
            "subContent":{ type: String, required: true }
        }],
        default:[]
    },
    "history": { 
        type: [{
            "commitMessage":{ type: String, required: true },
            "userId":{ type: String, required: true },
            "updatedDate":{ type:Date, default:Date.now}
        }],
        required:true
    },
};

const departmentObj = {
    "departmentId":{ type:String, required:true },
    "departmentName": { type:String, required:true },
    "researchLab": { 
        type: [{
            "researchLabId": { type: String, required: true },
            "researchLabName": { type: String, required: true },
            "researchLabDesc": { type: String, required: true }
        }],
        default: []
    }
};

const publicationObj = {
    "publicationId":{ type:String, required:true },
    "publicationType":{ type:String, required:true },
    "publicationName": { type: String, required: true },
    "paperTitle":{ type:String, required:true },
    "publisherId":{ type:String, required:true },
    "volumeNumber": { type: Number, required: true },
    "yearOfPublication":{ type:Date, required: true},
    "ISSN":{ type:String, required:true },
    "indexing":{ type:String, required:true },
    "role":{ type:String, required:true },
    "pagesFrom":{ type:Number, required:true },
    "pagesTo":{ type:Number, required:true },
    "ISBN":{ type:String, required:true },
    "contributionAs":{ type:String, required:true },
    "issueNumber":{ type:Number, required:true },
    "impactFactor":{ type:String, required:true },
    "editionNumber":{ type:Number, required:true },
    "DOIorURL":{ type:String, required:true },
    "coAuthor":{
        type: [{ type: String, required: true }],
        default:[] 
    }
};

const connection = {};
const usersSchema = new Schema(userObj, { collection: "Users", timestamps: true });
const projectsSchema = new Schema(projectObj, { collection: "Projects", timestamps: true });
const departmentsSchema = new Schema(departmentObj, { collection: "Departments", timestamps: true });
const publicationsSchema = new Schema(publicationObj, { collection: "Publications", timestamps: true });

connection.getCollection = collectionName => {
    return mongoose.connect("mongodb://localhost:27017/RandDDB", 
    {useNewUrlParser: true, useUnifiedTopology: true}).then((db) => {
        switch (collectionName){
            case COLLECTION_NAME.USERS: return db.model(collectionName, usersSchema);
            case COLLECTION_NAME.PROJECTS: return db.model(collectionName, projectsSchema);
            case COLLECTION_NAME.DEPARTMENTS: return db.model(collectionName, departmentsSchema);
            case COLLECTION_NAME.PUBLICATIONS: return db.model(collectionName, publicationsSchema);
        }
    }).catch(err => {
        let error = new Error("Could not connect to database")
        error.status = 500
        throw error
    });
}

module.exports = connection;