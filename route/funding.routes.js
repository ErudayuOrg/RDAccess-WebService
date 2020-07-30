const express = require("express");
const path = require('path');
const fundingService = require("../service/funding.service");
const {userAuth, adminAuth} = require('../middleware/auth.middleware');
const {upload, setPathFilledApplication} = require('../middleware/file-system.middleware');


const fundingRouter = express.Router();

fundingRouter.get("/all-summary", userAuth, (req, res, next) => {
    fundingService.getAllFundingsSummary()
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.post("/create-new", userAuth, adminAuth, (req, res, next) => {
    fundingService.createNewFunding(req.body, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

fundingRouter.get("/detail/:fundingId", userAuth, (req, res, next) => {
    fundingService.getFundingDetailById(req.params.fundingId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.put("/update/:fundingId", userAuth, adminAuth, (req, res, next) => {
    fundingService.updateFundingDetailById(req.body, req.params.fundingId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});


/* funding projects routes */

fundingRouter.get("/funding-project/detail/:fundingProjectId", userAuth, (req, res, next) => {
    fundingService.getFundingProjectById(req.params.fundingProjectId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.get("/funding-project/project/:projectId", userAuth, (req, res, next) => {
    fundingService.getFundingsByProjectId(req.params.projectId)
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.post("/funding-project/create", userAuth, (req, res, next) => {
    fundingService.addReceivedFundingProject(req.body, req.auth.userId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

fundingRouter.put("/funding-project/update/:fundingProjectId", userAuth, (req, res, next) => {
    fundingService.updateReceivedFPById(req.body, req.params.fundingProjectId)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

fundingRouter.put("/funding-project/filled-uplaod/:fundingProjectId", userAuth, setPathFilledApplication, upload.single('file'), (req, res, next) => {
    const filledApplication = {
        path : req.file.destination,
        fileName: req.file.filename
    }
    fundingService.addFolderPathApplication(filledApplication, req.params.fundingProjectId)
    .then(response => res.status(201).send(response))
    .catch(error => next(error));
});

fundingRouter.post("/funding-project/filled-download", (req, res, next) => {
    const docPath = path.join(__dirname,`../`) + req.body.path;
    res.sendFile(docPath);
});

module.exports = fundingRouter;
