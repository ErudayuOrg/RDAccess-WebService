const {ID_PREFIX} = require('../keys/constant');
const userModel = require('../model/user.model');

const serviceUtils = {};

serviceUtils.mapProjectForUser =  projects =>{
    let result = [];
    if(projects.length > 0)
        result =  projects.map( ({projectId,projectTitle,status,createdAt}) => ({projectId,projectTitle,status,createdAt}) );
    return result;
}

serviceUtils.mapPublicationForUser =  publication =>{
    let result = [];
    if(publication.length > 0)
        result =  publication.map( ({publicationId,publicationType,publicationName,paperTitle,yearOfPublication,ISBN}) => ({publicationId,publicationType,publicationName,paperTitle,yearOfPublication,ISBN}) );
    return result;
}

serviceUtils.mapProjectSummary =  projects =>{
    let result = [];
    if(projects.length > 0)
        result =  projects.map( ({projectId,projectTitle,projectSummary,team,createdAt,updatedAt}) => ({projectId,projectTitle,projectSummary,team,createdAt,updatedAt}) );
    return result;
}

serviceUtils.mapIdToUser =  team =>{
    return team.map( id  =>  {
        return userModel.getUserById(id).then( ({userId, userName}) =>{
            return `${userId}-${userName}`;
        })
    })
}


serviceUtils.generateId = ( prefix, count) =>{
    switch(prefix){
        case ID_PREFIX.PROJECT: return `${ID_PREFIX.PROJECT}${100000+count+1}`;
        case ID_PREFIX.PUBLICATION: return `${ID_PREFIX.PUBLICATION}${100000+count+1}`;
    }
}

module.exports = serviceUtils;