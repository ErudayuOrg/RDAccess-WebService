const {ID_PREFIX} = require('../keys/constant');

const serviceUtils = {};

serviceUtils.mapProjectForUser =  projects =>{
    let result = [];
    if(projects.length > 0)
        result =  projects.map( ({projectId,projectTitle,status,createdAt}) => ({projectId,projectTitle,status,createdAt}) );
    return result;
}

serviceUtils.generateId = ( prefix, count) =>{
    switch(prefix){
        case ID_PREFIX.PROJECT: return `${ID_PREFIX.PROJECT}${100000+count+1}`;
    }
}

module.exports = serviceUtils;