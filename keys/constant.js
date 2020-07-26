const COLLECTION_NAME = {
    USERS:"Users",
    PROJECTS:"Projects",
    DEPARTMENTS:"Departments",
    PUBLICATIONS:"Publications",
    NOTIFICATIONS:"Notifications",
    FUNDINGS:"Fundings",
    FUNDED_PROJECTS: "Funded_projects"
};

const ID_PREFIX = {
    PROJECT:"PRO",
    PUBLICATION:"PUB",
    FUNDING:"FUN"
}

const JWT_KEY = {
    SECRET:"USER_SECRET"
}

const ROLE_WITH_ADMIN_AUTH = ['ADMIN'];
  
module.exports = {COLLECTION_NAME, JWT_KEY, ID_PREFIX, ROLE_WITH_ADMIN_AUTH};
