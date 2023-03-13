const express = require("express");
const cors = require("cors");
const connectDB = require("./utils/db");
const showRequests = require("./middlewares/showRequests");
const userRoutes = require("./routes/userRoutes");
const photoRoutes = require("./routes/photoRoutes");
const commentRoutes = require("./routes/commentRoutes");
const likeRoutes = require("./routes/likeRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");
require("dotenv").config();

const PORT = process.env.PORT || 6000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(showRequests);

// routes
app.use("/api/users", userRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);

app.get("/", (req, res) => {
  res.send("server is running");
});

// error middleware
app.use(errorMiddleware);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server listening on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
