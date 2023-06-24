const Report = require("../models/reportModel");

exports.getAllReports = async (req, res) => {
  const reports = await Report.find();
  res.status(200).json({ reports });
};

exports.createReport = async (req, res) => {
  try {
    const { month, revenue, expenses, profitLoss } = req.body;
    console.log(req.body);
    // Validation or other logic can go here...

    // Create the new report
    const report = new Report({
      month,
      revenue,
      expenses,
      profitLoss,
    });

    await report.save();

    res.status(201).json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
