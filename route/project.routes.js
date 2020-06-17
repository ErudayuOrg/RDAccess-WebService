const express = require("express");
const projectService = require("../service/project.service");

const projectRouter = express.Router();

projectRouter.get("/restore-default-projects", (req, res, next) => {
    projectService.insertScript()
        .then(response => {
            res.status(201);
            res.json({ message: "Inserted " + response + " Projects in DB" });
        })
        .catch(error => next(error));
});

projectRouter.get("/lab/:labId",(req, res, next) => {
    projectService.getProjectsByLabId(req.params.labId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

projectRouter.get("/overview/:projectId",(req, res, next) => {
    projectService.getProjectById(req.params.projectId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

module.exports = projectRouter;