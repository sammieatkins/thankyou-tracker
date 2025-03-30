const mongoose = require("mongoose");

const thankYouSchema = new mongoose.Schema({
  giverName: String,
  preferredName: String,
  giftDescription: String,
  giftNote: String,
  dateReceived: Date,
  progress: {
    written: { type: Boolean, default: false },
    addressed: { type: Boolean, default: false },
    stuffed: { type: Boolean, default: false },
    stamped: { type: Boolean, default: false },
    sent: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("ThankYouEntry", thankYouSchema);
