const COLLECTION_NAME = {
    USERS:"Users",
    PROJECTS:"Projects",
    DEPARTMENTS:"Departments",
    PUBLICATIONS:"Publications",
    NOTIFICATIONS:"Notifications",
    FUNDINGS:"Fundings",
    FUNDING_PROJECTS: "Funding_projects"
};

const ID_PREFIX = {
    PROJECT:"PRO",
    PUBLICATION:"PUB",
    FUNDING:"FUN",
    FUNDING_PROJECTS:"FUP"
}

const JWT_KEY = {
    SECRET:"USER_SECRET"
}

const PROJECT_STATUS_CODE ={
    ONGOING: '01',
    COMPLETED:'02'
}

const FUNDING_STATUS_CODE ={
    STARTED: '01',
    APPLIED:'02',
    CHECKED:'03',
    SUBMITTED:'04',
    REVIEW: '05',
    SHORTLISTED:'06',
    REJECTED:'07',
    ACCEPTED:'08'
}

const ROLE_WITH_ADMIN_AUTH = ['ADMIN'];
  
module.exports = {
    COLLECTION_NAME,
    JWT_KEY,
    ID_PREFIX,
    ROLE_WITH_ADMIN_AUTH,
    PROJECT_STATUS_CODE,
    FUNDING_STATUS_CODE
};
