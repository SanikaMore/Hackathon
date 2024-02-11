const catchAsync = require("../utils/catchAsync");
const RepoDoubt = require("../models/repodoubtModel");
const { ObjectId } = require("mongodb");

exports.createRepoDoubt = catchAsync(async (req, res) => {
  const { owner, repo, doubtTitle, description, tags, media, user } = req.body;
  try {
    const newRepoDoubt = await RepoDoubt.create({
      owner: owner,
      repo: repo,
      doubtTitle: doubtTitle,
      description: description,
      tags: tags,
      createdAt: Date.now(),
      media: media,
    });

    res.status(201).json(newRepoDoubt);
  } catch (err) {
    console.log(err)
    res.status(500).json("Couldn't create repository doubt!! Please try again!");
  }
});

exports.deleteRepoDoubt = catchAsync(async (req, res) => {
  const { id, user } = req.params;
  try {
    const repoDoubt = await RepoDoubt.findById(id);
    if (!repoDoubt) {
      return res.status(404).json({ message: "Repository doubt not found" });
    }

    if (repoDoubt.creator.toString() !== user) {
      return res.status(403).json({ message: "You are not allowed to delete this repository doubt" });
    }

    await repoDoubt.remove();

    res.status(200).json({ message: "Repository doubt deleted successfully" });
  } catch (err) {
    res.status(500).json("Couldn't delete repository doubt!! Please try again!");
  }
});

exports.fetchAllRepoDoubts = catchAsync(async (req, res) => {
  try {
    const {owner,repo} = req.body;
    console.log(owner)
    const repoDoubts = await RepoDoubt.find({owner,repo}).sort({ createdAt: -1 });
    res.status(200).json(repoDoubts);
  } catch (err) {
    res.status(500).json("Error occurred while fetching repository doubts! Please try again!");
  }
});

exports.fetchSingleRepoDoubt = catchAsync(async (req, res) => {
  const { id } = req.params;
  try {
    const repoDoubt = await RepoDoubt.findById(id);
    if (!repoDoubt) {
      return res.status(404).json({ message: "Repository doubt not found" });
    }
    res.status(200).json(repoDoubt);
  } catch (err) {
    res.status(500).json("Error occurred while fetching repository doubt! Please try again!");
  }
});

exports.voteRepoDoubt = catchAsync(async (req, res) => {
    const { doubtData, user, type } = req.body;
  
    try {
      const repoDoubt = await RepoDoubt.findById(doubtData._id);
      // Assuming you have a User model imported and defined as User
      const owner = await User.findById(repoDoubt.creator);
  
      if (type === "up") {
        if (repoDoubt.downVotes.indexOf(user._id) !== -1)
          repoDoubt.downVotes.splice(repoDoubt.downVotes.indexOf(user._id), 1);
  
        if (repoDoubt.upVotes.indexOf(user._id) === -1)
          repoDoubt.upVotes.push(user._id);
        else
          repoDoubt.upVotes.splice(repoDoubt.upVotes.indexOf(user._id), 1);
      }
      else {
        if (repoDoubt.upVotes.indexOf(user._id) !== -1)
          repoDoubt.upVotes.splice(repoDoubt.upVotes.indexOf(user._id), 1);
  
        if (repoDoubt.downVotes.indexOf(user._id) === -1)
          repoDoubt.downVotes.push(user._id);
        else
          repoDoubt.downVotes.splice(repoDoubt.downVotes.indexOf(user._id), 1);
      }
  
      await repoDoubt.save();
  
      res.status(200).json({ repoDoubt, owner });
    } catch (err) {
      res.status(500).json("Error occurred while processing! Please try again!");
    }
  });
  
  exports.sortRepoDoubtReplies = catchAsync(async (req, res) => {
    const { id, type } = req.body;
  
    try {
      const repoDoubt = await RepoDoubt.findById(id);
  
      let repoDoubtReplies = [];
      if (type === "most_recent")
        repoDoubtReplies = await Reply.find({ replyToPost: repoDoubt._id }).sort({ createdAt: -1 });
      else {
        repoDoubtReplies = await Reply.find({ replyToPost: repoDoubt._id });
        repoDoubtReplies.sort((a, b) => b.upVotes.length - a.upVotes.length);
      }
      const replyInfo = [];
  
      for (const reply of repoDoubtReplies)
        replyInfo.push({ replyData: reply, ownerInfo: await User.findById(reply.creator) });
  
      res.status(200).json({ repoDoubt, replies: replyInfo });
    } catch (err) {
      res.status(500).json(err);
    }
  });
