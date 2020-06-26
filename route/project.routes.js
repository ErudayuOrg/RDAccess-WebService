const express = require("express");
const projectService = require("../service/project.service");
const {userAuth} = require('../middleware/auth.middleware');

const projectRouter = express.Router();

projectRouter.get("/restore-default-projects", (req, res, next) => {
    projectService.insertScript()
        .then(response => {
            res.status(201);
            res.json({ message: "Inserted " + response + " Projects in DB" });
        })
        .catch(error => next(error));
});

projectRouter.get("/lab/:labId", userAuth, (req, res, next) => {
    projectService.getProjectsByLabId(req.params.labId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

projectRouter.get("/overview/:projectId", userAuth, (req, res, next) => {
    projectService.getProjectById(req.params.projectId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

projectRouter.post("/create-new", userAuth, (req, res, next) => {
    projectService.createNewProject(req.body)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

projectRouter.put("/update/:projectId", userAuth, (req, res, next) => {
    projectService.updateProjectById(req.body,req.params.projectId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

module.exports = projectRouter;