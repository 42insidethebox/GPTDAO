const Proposal = require("../models/proposalModel");

exports.getAllProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find().lean();
    proposals.forEach((proposal) => {
      proposal.date = proposal.createdAt.toISOString().split("T")[0];
      proposal.votingPercentage = (proposal.votes / proposal.totalVotes) * 100;
      proposal.status = proposal.expiryDate < new Date() ? "Expired" : "Active";
    });
    res.status(200).json(proposals);
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ message: "Error retrieving proposals", error });
  }
};
exports.createProposal = async (req, res) => {
  try {
    const proposalData = { ...req.body, creator: req.user.id };
    const proposal = new Proposal(proposalData);
    await proposal.save();
    res
      .status(201)
      .json({ message: "Proposal created successfully :)", proposal });
  } catch (error) {
    console.error("Error details:", error);
    res.status(400).json({ message: "Error creating proposal", error });
  }
};
