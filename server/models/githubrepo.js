const mongoose = require("mongoose");
const validator = require("validator");


const githubRepoSchema = new mongoose.Schema({
  owner: {
    type: String,
    required: [true, "Owner is compulsory"],
    trim: true,
  },

  repo_name: {
    type: String,
    required: [true, "Repository name is compulsory"],
    trim: true,
  },

  repository_url: {
    type: String,
    required: [true, "Repository URL is required"],
  },

  easeOfProject: {
    type: Number,
    required: [true, "Ease of project is required"],
    trim: true,
  },

  languageUsed: {
    type: [String],
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },

  // Other fields if needed...

});

const GitHubRepo = mongoose.model("GitHubRepo", githubRepoSchema);
module.exports = GitHubRepo;
