const { Router } = require('express');
 // Import Octokit
const { data } = require('../opensource');
const catchAsync = require('../utils/catchAsync');

// const octokit = new Octokit(); // Initialize Octokit

exports.getCommitsByUserAndRepo = (octokit) => {
  const router = Router();
  console.log("k")
  console.log(octokit+"=====================")
  router.post('/getCommitsByUser', async (req, res) => {
    try {
      const user1 = req.body.username;
      let commitCount = 0;
      for (let i = 0; i < data.length; i++) {
        const repo = data[i].repo_name;
        const user2 = data[i].owner;
        console.log(repo+user2+user1)
        const commitsResponse = await octokit.request(`GET /repos/${user2}/${repo}/commits`);

        // Filter commits authored by user1
        const user1Commits = commitsResponse.data.filter(commit => commit.author && commit.author.login === user1);
        commitCount += user1Commits.length;
      }

      console.log(commitCount);

      res.json({ commitCount });
    } catch (error) {
      console.error('Error fetching commits:', error);
      res.status(500).send('Error fetching commits');
    }
  })

  return router;
};
