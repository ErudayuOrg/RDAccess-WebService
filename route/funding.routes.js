const express = require("express");
const fundingService = require("../service/funding.service");
const {userAuth, adminAuth} = require('../middleware/auth.middleware');

const fundingRouter = express.Router();

fundingRouter.get("/all-summary", userAuth, (req, res, next) => {
    fundingService.getAllFundingsSummary()
        .then(response => res.send(response))
        .catch(error => next(error));
});

fundingRouter.post("/create-new", userAuth, adminAuth, (req, res, next) => {
    fundingService.createNewFunding(req.body)
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

module.exports = fundingRouter;
