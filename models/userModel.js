const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  emailVerificationToken: String,
  emailVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  bio: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "",
  },
  socialMediaHandles: {
    twitter: {
      type: String,
      default: "",
    },
    linkedIn: {
      type: String,
      default: "",
    },
    cryptoWalletAddress: {
      type: String,
      default: "",
    },
  },
  settings: {
    profileVisibility: {
      type: String,
      enum: ["public", "private", "connections"],
      default: "public",
    },
    emailNotifications: {
      type: Boolean,
      default: true,
    },
    pushNotifications: {
      type: Boolean,
      default: true,
    },
    smsNotifications: {
      type: Boolean,
      default: false,
    },
    dataSharing: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      default: "en",
    },
    timeZone: {
      type: String,
      default: "utc",
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
  },
  coursesEnrolled: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Course",
    },
  ],
  nftCollection: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "NFT",
    },
  ],
  votes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Vote",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Hash the password before saving the user model
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match the user's entered password with the hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ user: { id: this._id } }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = mongoose.model("User", UserSchema);
