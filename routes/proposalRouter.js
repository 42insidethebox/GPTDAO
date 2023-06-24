const express = require("express");
const router = express.Router();
const proposalsController = require("../controllers/proposalsController");
const Proposal = require("../models/proposalModel");

router.get("/", proposalsController.getAllProposals);
router.post("/", proposalsController.createProposal);

router.get("/:id", async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (proposal) {
      res.json(proposal);
    } else {
      res.status(404).send({ error: "Proposal not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
});
module.exports = router;
