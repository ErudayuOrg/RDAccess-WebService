const express = require("express");
const departmentService = require("../service/department.service");
const { userAuth, updateAuth } = require('../middleware/auth.middleware');

const departmentRouter = express.Router();

departmentRouter.get("/restore-default-departments", (req, res, next) => {
    departmentService.insertScript()
        .then(response => {
            res.status(201);
            res.json({ message: "Inserted " + response + " Departments in DB" });
        })
        .catch(error => next(error));
});

departmentRouter.get("/all-departments", (req, res, next) => {
    departmentService.getAllDepartments()
    .then(response => res.send(response))
    .catch(error => next(error));
});

departmentRouter.get("/snapshot", (req, res, next) => {
    departmentService.getDepartmentSnapshot()
    .then(response => res.send(response))
    .catch(error => next(error));
});

departmentRouter.get("/over-all-snapshot", (req, res, next) => {
    departmentService.getOverAllSnapshot()
    .then(response => res.send(response))
    .catch(error => next(error));
});

departmentRouter.post("/create-department", userAuth, updateAuth, (req, res, next) => {
    departmentService.createDepartment(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});

departmentRouter.put("/create-research-lab/:departmentId", userAuth, updateAuth, (req, res, next) => {
    departmentService.createResearchLab(req.body, req.params.departmentId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

module.exports = departmentRouter;