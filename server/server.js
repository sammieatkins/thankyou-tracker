const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API ROUTES
const giftRoutes = require("./routes/gifts");
app.use("/api/gifts", giftRoutes);

// DB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected!");

    const path = require("path");

    // SERVE FRONTEND STATIC FILES
    app.use(
      express.static(path.join(__dirname, "../client/dist/client/browser"))
    );
    app.get("*", (req, res) => {
      res.sendFile(
        path.join(__dirname, "../client/dist/client/browser/index.html")
      );
    });

    // START SERVER
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
