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
    "status":{ type: String, default: '01' },
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
    }
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

const fundingObj = {
    "fundingId": { type: String, required: true },
    "nameOfGrant": { type: String, required: true },
    "fundingOrganisation": { type: String, required: true },
    "descriptionOfScheme": { type: String, required: true },
    "deadline": { type: Date, required: true },
    "additionalDetails": { 
        type: [{
            "title":{ type: String, required: true },
            "detail":{ type: String, required: true }
        }],
        required:true
    },
    "fundingUrls": { 
        type: [{
            "title":{ type: String, required: true },
            "url":{ type: String, required: true }
        }],
        required:true
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

const fundingProjectObj = {
    "fundingProjectId": { type: String, required: true },
    "nameOfGrant": { type: String, required: true },
    "fundingOrganisation": { type: String, required: true },
    "fundingType": { type: String, required: true },
    "project": {  
        type: {
            "projectTitle":{ type: String, required: true },
            "projectId":{ type: String, required: true }
        },
        required:true
    },
    "investigator": { type: String, required: true },
    "coInvestigator": { 
        type: [{ type: String, required: true }],
        default: [] 
    },
    "appliedFundingId": { type: String, default: '' },   
    "isReceivedFund": { type: Boolean, default: false },
    "summary": { type: String, default: '' },    
    "keywords": { 
        type: [{ type: String, required: true }],
        default:[]
    },
    "fundingAmount": { 
        type: { 
            "received":{ type: String },
            "consumable":{ type: String },
            "nonConsumable":{ type: String }
         },
        default:null
    },
    "fundDates":{  
       type :{  
           "received":{ type: String },
            "start":{ type: String},
            "end":{ type: String}
         },
        default:null
    }, 
    "applicationChecks":{
        type: { 
            "filled":{ type: String, default: false },
            "hod":{ type: String, default: false },
            "proposal":{ type: String, default: false },
            "technical":{ type: String, default: false },
            "principal":{ type: String, default: false }
        },
        default:null
    },
    "status": { type: String, default: '01' }, 
    "history": { 
        type: [{
            "commitMessage":{ type: String, required: true },
            "userId":{ type: String, required: true },
            "updatedDate":{ type:Date, default:Date.now}
        }],
        required:true
    }
};

const notificationObj = {
    "from": { type: String, required: true },
    "to": { type: String, required: true},
    "payload":{ type:String, required: true}
};

const connection = {};
const usersSchema = new Schema(userObj, { collection: "Users", timestamps: true });
const projectsSchema = new Schema(projectObj, { collection: "Projects", timestamps: true });
const departmentsSchema = new Schema(departmentObj, { collection: "Departments", timestamps: true });
const publicationsSchema = new Schema(publicationObj, { collection: "Publications", timestamps: true });
const fundingsSchema = new Schema(fundingObj, { collection: "Fundings", timestamps: true });
const fundingProjectsSchema = new Schema(fundingProjectObj, { collection: "Funding_projects", timestamps: true });
const notificationsSchema = new Schema(notificationObj, { collection: "Notifications", timestamps: true });


connection.getCollection = collectionName => {
    const DB_HOST = "mongodb://localhost:27017";
    return mongoose.connect(`${DB_HOST}/RandDDB`, 
    {useNewUrlParser: true, useUnifiedTopology: true}).then((db) => {
        switch (collectionName){
            case COLLECTION_NAME.USERS: return db.model(collectionName, usersSchema);
            case COLLECTION_NAME.PROJECTS: return db.model(collectionName, projectsSchema);
            case COLLECTION_NAME.DEPARTMENTS: return db.model(collectionName, departmentsSchema);
            case COLLECTION_NAME.PUBLICATIONS: return db.model(collectionName, publicationsSchema);
            case COLLECTION_NAME.FUNDINGS: return db.model(collectionName, fundingsSchema);
            case COLLECTION_NAME.FUNDING_PROJECTS: return db.model(collectionName, fundingProjectsSchema);
            case COLLECTION_NAME.NOTIFICATIONS: return db.model(collectionName, notificationsSchema);
        }
    }).catch(err => {
        let error = new Error("Could not connect to database");
        error.status = 500;
        throw error;
    });
}

module.exports = connection;