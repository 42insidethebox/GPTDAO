const mongoose = require("mongoose");

const ProposalSchema = new mongoose.Schema({
  proposalType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  targetAudience: String,
  currentStatus: String,
  kpis: [String],
  risksAndChallenges: [String],
  dependencies: [String],
  ownershipAndGovernance: String,
  intellectualPropertyRights: String,
  confidentialityAgreement: String,
  socialImpact: String,
  diversityInclusion: String,
  attachments: [
    {
      fileName: String,
      fileType: String,
      fileUrl: String,
    },
  ],
  link: String,
  budget: Number,
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: function () {
      const oneWeek = 7 * 24 * 60 * 60 * 1000;
      return new Date(Date.now() + oneWeek);
    },
  },
  quorum: {
    type: Number,
    default: 0.3,
  },
  acceptanceThreshold: {
    type: Number,
    default: 0.5,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  votes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Vote",
    },
  ],
  status: {
    type: String,
    enum: ["active", "expired", "passed", "failed"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Proposal", ProposalSchema);
