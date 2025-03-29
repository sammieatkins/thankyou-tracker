const mongoose = require("mongoose");

const giftSchema = new mongoose.Schema({
  giverName: String,
  giftDescription: String,
  thankYouSent: Boolean,
  dateReceived: Date,
});

module.exports = mongoose.model("Gift", giftSchema);
