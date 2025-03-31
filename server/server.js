const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🎉 Server is up and running!");
});

// Routes
const giftRoutes = require("./routes/gifts");
app.use("/api/gifts", giftRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected!");
    const path = require("path");

    app.use(express.static(path.join(__dirname, "../client/dist/client")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/client/index.html"));
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
