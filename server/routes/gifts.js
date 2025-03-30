const express = require("express");
const router = express.Router();
const thankYouEntry = require("../models/thankYouEntry");

// GET all gifts
router.get("/", async (req, res) => {
  const gifts = await thankYouEntry.find();
  res.json(gifts);
});

// POST new gift
router.post("/", async (req, res) => {
  const gift = new thankYouEntry(req.body);
  const savedGift = await gift.save();
  res.json(savedGift);
});

// PUT (update) a gift
router.put("/:id", async (req, res) => {
  const updated = await thankYouEntry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE a gift
router.delete("/:id", async (req, res) => {
  await thankYouEntry.findByIdAndDelete(req.params.id);
  res.json({ message: "Gift deleted" });
});

module.exports = router;
