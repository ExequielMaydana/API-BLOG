const router = require("express").Router();
const passport = require("passport");
require("../middleware/auth.middleware")(passport);

const postServices = require("./posts.http");

router.route("/").get(postServices.getAll).post(passport.authenticate('jwt', {session: false}), postServices.getCreate);

router.get("/:id", postServices.getById);

router.get(
  "/me/posts",
  passport.authenticate("JWT", { session: false }),
  postServices.getAllPostUser
);

router
  .route("/me/posts/:id")
  .get(
    passport.authenticate("jwt", { session: false }),
    postServices.getPostEspecifiUser
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    postServices.editPostByUser
  )
  .delete(
    passport.authenticate("jwt", { session: false }),
    postServices.removePostByUser
  );

module.exports = { router };
