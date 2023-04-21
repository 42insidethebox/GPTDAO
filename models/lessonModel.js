const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  part_1: {
    type: String,
    required: false,
  },
  part_2: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: false,
  },
  duration: {
    type: Number,
    required: false,
  },
  prerequisites: {
    type: [String],
    required: false,
  },
  requirements: {
    type: [String],
    required: false,
  },
  materials: {
    type: [String],
    required: false,
  },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;
