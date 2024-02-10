const catchAsync = require("./../utils/catchAsync");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const Doubt = require("../models/doubtModel");
const Reply = require("../models/replyModel");
const GitHubRepo = require("../models/githubrepo");

exports.createGitHubRepo = catchAsync(async (req, res) => {
  const { owner, repo_name, repository_url, easeOfProject, languageUsed } = req.body;
  console.log()
  try {
    const newGitHubRepo = await GitHubRepo.create({
      owner,
      repo_name,
      repository_url,
      easeOfProject,
      languageUsed,
      createdAt: Date.now(),
      // Other fields if needed...
    });

    res.status(201).json(newGitHubRepo);
  } catch (err) {
    res.status(500).json("Couldn't create GitHubRepo! Please try again!");
  }
});

exports.getAllRepos = catchAsync(async (req, res) => {
  try {
    const allRepos = await GitHubRepo.find({}); // Find all GitHub repos
    res.status(200).json(allRepos);
  } catch (err) {
    console.error(err);
    res.status(500).json("Couldn't fetch GitHub repos! Please try again!");
  }
});


exports.createPost = catchAsync(async (req, res) => {
  const { title, description, tags, media, user, repository_url, easeOfProject, languages } = req.body;

  try {
    // Check if it's a GitHubRepo creation or a regular post
    if (repository_url) {
      // Creating a GitHubRepo
      const newGitHubRepo = await GitHubRepo.create({
        owner: user.name,
        repo_name: title,
        repository_url,
        easeOfProject,
        languageUsed: languages,
        createdAt: Date.now(),
        // Other fields if needed...
      });

      // Update user's GitHubRepo count
      user.materialCount += 1;
      await user.save();

      res.status(201).json(newGitHubRepo);
    } else {
      // Creating a regular post
      const newPost = await Post.create({
        title: title,
        description: description,
        tags: tags,
        creator: user._id,
        createdAt: Date.now(),
        media: media,
      });

      // Update user's post count
      user.materialCount += 1;
      await user.save();

      res.status(201).json(newPost);
    }
  } catch (err) {
    res.status(500).json("Couldn't create post or GitHubRepo! Please try again!");
  }
});


exports.createPost = catchAsync(async (req, res) => {
  const { title, description, tags, media, user } = req.body;
  try {
    const newPost = await Post.create({
      title: title,
      description: description,
      tags: tags,
      creator: user._id,
      createdAt: Date.now(),
      media: media,
    });
    user.materialCount += 1;
    await user.save();

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json("Couldn't create post!! Please try again!");
  }
});

exports.fetchAll = catchAsync(async (req, res) => {
  try {
    const allPosts = await Post.find({}).sort({ createdAt: -1 });
    const result = [];

    for (let i = 0; i < allPosts.length; ++i) {
      const owner = await User.findById(allPosts[i].creator, { _id: 0, password: 0, email: 0 });
      result.push({ postData: allPosts[i], ownerInfo: owner });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json("Couldn't find posts!! Please refresh and try again!!");
  }
});

exports.fetchOptions = catchAsync(async (req, res) => {
  const { options, name } = req.body;
  const requestedUser = await User.findOne({ name: name });

  if(!requestedUser){
    res.status(404).json("User not found!");
    return;
  }

  switch (options) {
    case "recent_material":
      const posts = await Post.find({ creator: requestedUser?._id }).limit(10).sort({ createdAt: -1 });
      res.status(200).json(posts);
      break;

    case "recent_doubts":
      const doubts = await Doubt.find({ creator: requestedUser?._id }).limit(10).sort({ createdAt: -1 });
      res.status(200).json(doubts);
      break;

    case "recent_replies":
      const replies = await Reply.find({ creator: requestedUser?._id }).limit(10).sort({ createdAt: -1 });
      res.status(200).json(replies);
      break;
  }
});

exports.vote = catchAsync(async (req, res) => {
  const { postData, type, user } = req.body;
  try {
    const post = await Post.findById(postData._id);
    const owner = await User.findById(post.creator);

    if (type === "up") {
      if (post.upVotes.indexOf(user._id) === -1) {
        post.upVotes.push(user._id);
        owner.reputation += 1;
      } else{
        post.upVotes.splice(post.upVotes.indexOf(user._id), 1);
        owner.reputation -= 1;
      }

      if (post.downVotes.indexOf(user._id) !== -1) {
        post.downVotes.splice(post.downVotes.indexOf(user._id), 1);
        owner.reputation += 1;
      }
    }
    else {
      if (post.downVotes.indexOf(user._id) === -1){
        post.downVotes.push(user._id);
        owner.reputation -= 1;
      }else{
        post.downVotes.splice(post.downVotes.indexOf(user._id), 1);
        owner.reputation += 1;
      }

      if (post.upVotes.indexOf(user._id) !== -1){
        post.upVotes.splice(post.upVotes.indexOf(user._id), 1);
        owner.reputation -= 1;
      }
    }

    await post.save();
    await owner.save();

    res.status(200).json({ postData: post, ownerInfo: owner });
  } catch (err) {
    res.status(500).json("Error occurred while processing! Please try again!");
  }
});