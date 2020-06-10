const express = require("express");
const usersService = require("../service/users.service");

const userRouter = express.Router();

userRouter.get("/restore-default-users", (req, res, next) => {
    usersService.insertScript()
      .then(response => {
          res.status(201);
          res.json({ message: "Inserted " + response + " products in DB" });
      })
      .catch(error => next(error));
});

userRouter.post("/profile", (req, res, next) => {
    usersService.getUserDetails(req.body)
    .then(response => res.send(response))
    .catch(error => next(error));
});

module.exports = userRouter;