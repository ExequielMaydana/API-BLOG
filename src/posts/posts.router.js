const router = require("express").Router();
const passport = require("passport");
require("../middleware/auth.middleware")(passport);

const postServices = require("./posts.http");

router.route("/").get(postServices.getAll).post(passport.authenticate('jwt', {session: false}), postServices.getCreate);

router.get("/:id", postServices.getById);

module.exports = { router };
