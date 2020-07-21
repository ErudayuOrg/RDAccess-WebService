const COLLECTION_NAME = {
    USERS:"Users",
    PROJECTS:"Projects",
    DEPARTMENTS:"Departments",
    PUBLICATIONS:"Publications"
};

const ID_PREFIX = {
    PROJECT:"PRO",
    PUBLICATION:"PUB"
}

const JWT_KEY = {
    SECRET:"USER_SECRET"
}

const ROLE_WITH_UPADATE_AUTH = ['ADMIN'];
  
module.exports = {COLLECTION_NAME, JWT_KEY, ID_PREFIX, ROLE_WITH_UPADATE_AUTH};
