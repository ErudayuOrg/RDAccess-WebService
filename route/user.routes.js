const express = require("express");
const usersService = require("../service/user.service");
const { userAuth, updateAuth } = require('../middleware/auth.middleware');

const userRouter = express.Router();

userRouter.get("/restore-default-users", (req, res, next) => {
    usersService.insertScript()
      .then(response => {
          res.status(201);
          res.json({ message: "Inserted " + response + " Users in DB" });
      })
      .catch(error => next(error));
});

userRouter.post("/login", (req, res, next) => {
    usersService.loginUser(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/profile/:userId", userAuth, (req, res, next) => {
    usersService.getUserDetails(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/projects/:userId", userAuth, (req, res, next) => {
    usersService.getProjectsByUserId(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.get("/match-userId/:userId", userAuth, (req, res, next) => {
    usersService.getMatchingUserId(req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.post("/create", userAuth, updateAuth, (req, res, next) => {
    usersService.createUser(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});

userRouter.put("/update-password/:userId", userAuth, (req, res, next) => {
    usersService.updatePassword(req.body, req.params.userId)
    .then(response => res.send(response))
    .catch(error => next(error));
});

module.exports = userRouter;