const express = require("express");
const reportController = require("../controllers/reportController");
const Proposal = require("../models/proposalModel"); // Assuming you have a Proposal model
const router = express.Router();

router.get("/", reportController.getAllReports);
router.post("/", reportController.createReport);
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
