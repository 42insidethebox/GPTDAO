const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    position: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    resume: { type: String, required: true }, // Assuming this is a URL to a hosted resume file (pdf, png, jpg)
    linkedIn: { type: String },
    github: { type: String },
    portfolio: { type: String }, // URL to a portfolio site
    knownTechnologies: [String], // Array of known technologies/languages
    languages: [String], // Spoken languages
    availability: { type: String }, // e.g. "Full-time", "Part-time", etc.
    additionalInformation: { type: String }, // Any additional information the applicant may want to provide
  },
  {
    timestamps: true, // Creates fields for "created at" and "updated at"
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
