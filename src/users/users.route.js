const router = require("express").Router();
const passport = require('passport')
require('../middleware/auth.middleware')(passport)

const userServices = require("./users.http");
const postServices = require("../posts/posts.http");

router.get(("/"), userServices.getAll);

router.post(("/register"), userServices.getCreate);

router.route('/me')
  .get(passport.authenticate('jwt', {session: false}),userServices.getMyUser)
  .put(passport.authenticate('jwt', {session: false}),userServices.editMyUser)
  .delete(passport.authenticate('jwt', {session: false}), userServices.deteleMyUser)

router
  .route("/:id")
  .get(userServices.getById)
  .put(userServices.getUpdate)
  .delete(userServices.getDelete);

router.get(("/me/posts"), passport.authenticate("jwt", {session: false}), postServices.getAllPostUser)
  

router.route("/me/posts/:id")
  .get(passport.authenticate("jwt", {session: false}), postServices.getPostEspecifiUser)
  .put(passport.authenticate("jwt", {session: false}), postServices.editPostByUser)
  .delete(passport.authenticate("jwt", {session: false}), postServices.removePostByUser)

module.exports = { router };
