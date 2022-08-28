const router = require("express").Router();
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const userServices = require("./users.http");

router.route("/").get(userServices.getAll);

router.route("/register").post(userServices.getCreate);

router.route('/me')
  .get(passport.authenticate('jwt', {session: false}),userServices.getMyUser)
  .put(passport.authenticate('jwt', {session: false}),userServices.editMyUser)
  .delete(passport.authenticate('jwt', {session: false}), userServices.deteleMyUser)

router
  .route("/:id")
  .get(userServices.getById)
  .put(userServices.getUpdate)
  .delete(userServices.getDelete);

module.exports = { router };
