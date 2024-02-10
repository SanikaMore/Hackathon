const express = require("express");
const postController = require("./../controllers/postController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.route("/github-repos").post( postController.createGitHubRepo);
router.route("/getGithub").get( postController.getAllRepos);


router
  .route("/create")
  .post(authController.protect, postController.createPost);

router.route("/fetch/all").post(postController.fetchAll);
router.route("/fetch/options").post(authController.protect, postController.fetchOptions);
router.route("/vote").post(authController.protect, postController.vote);

module.exports = router;