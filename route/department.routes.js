const express = require("express");
const departmentService = require("../service/department.service");

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


module.exports = departmentRouter;