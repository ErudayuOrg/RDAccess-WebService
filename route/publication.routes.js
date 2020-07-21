const express = require("express");
const publicationService = require("../service/publication.service");
const {userAuth} = require('../middleware/auth.middleware');

const publicationRouter = express.Router();

publicationRouter.get("/restore-default-publications", (req, res, next) => {
    publicationService.insertScript()
      .then(response => {
          res.status(201);
          res.json({ message: "Inserted " + response + " publications in DB" });
      })
      .catch(error => next(error));
});

publicationRouter.get("/all-summary", userAuth, (req, res, next) => {
    publicationService.getAllpublicationsSummary()
        .then(response => res.send(response))
        .catch(error => next(error));
});

publicationRouter.post("/create-new", userAuth, (req, res, next) => {
    publicationService.createNewPublication(req.body)
        .then(response => res.status(201).send(response))
        .catch(error => next(error));
});

module.exports = publicationRouter;