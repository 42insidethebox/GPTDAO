const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: String,
  subcategory: String,
  skillLevel: String,
  language: String,
  price: Number,
  isPublished: Boolean,
  publishedDate: Date,
  lastUpdated: Date,
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rating: Number,
    },
  ],
  enrolledUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  curriculum: [
    {
      sectionTitle: String,
      sectionDescription: String,
      lectures: [
        {
          lectureTitle: String,
          lectureDescription: String,
          contentType: {
            type: String,
            enum: ["text", "audio", "video"],
            default: "text",
          },
          content: String,
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
