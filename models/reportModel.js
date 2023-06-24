const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  revenue: {
    tokenSales: {
      numberOfTokensSold: {
        type: Number,
        required: true,
      },
      pricePerToken: {
        type: Number,
        required: true,
      },
    },
    totalRevenue: {
      type: Number,
      required: true,
    },
  },
  expenses: {
    cost: {
      type: Number,
      required: true,
    },
    totalExpenses: {
      type: Number,
      required: true,
    },
  },
  profitLoss: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", ReportSchema);
