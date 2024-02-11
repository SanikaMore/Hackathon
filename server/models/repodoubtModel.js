const mongoose = require("mongoose");

const repodoubtSchema = new mongoose.Schema({
    owner:{
        type: String,
        required: [true, "owner cannot be empty"],
    },
    repo:{
        type: String,
        required: [true, "repo cannot be empty"],
    },
    doubtTitle: {
        type: String,
        required: [true, "Doubt cannot be empty"],
    },
    media: {
        type: Array,
        default: [],
    },
    description: {
        type: String,
        required: [true, "Description cannot be empty"],
    },
    tags: {
        type: Array,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    upVotes: {
        type: Array,
        default: [],
    },
    downVotes: {
        type: Array,
        default: [],
    },
    // creator: {
    //     type: mongoose.Schema.ObjectId,
    // },
    views: {
        type: Number,
        default: 0,
    },
});

const repoDoubt = mongoose.model("repoDoubt", repodoubtSchema);
module.exports = repoDoubt;