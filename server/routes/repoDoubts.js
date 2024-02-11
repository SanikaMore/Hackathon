const express = require("express");
const router = express.Router();
const repoController = require("../controllers/repodoubtController");

router.post("/create", repoController.createRepoDoubt);
router.delete("/:id/:user", repoController.deleteRepoDoubt);
router.post("/fetch", repoController.fetchAllRepoDoubts);
router.get("/:id", repoController.fetchSingleRepoDoubt);
router.post("/vote", repoController.voteRepoDoubt);
router.post("/sortReplies", repoController.sortRepoDoubtReplies);

module.exports = router;
