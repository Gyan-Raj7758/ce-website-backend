require("dotenv").config();
const express = require("express");
const contactUsRoutes = require("./src/routes/contactUs.routes");
const demoVideosRoutes = require("./src/routes/demoVideos.routes");
const corsMiddleware = require("./src/middlewares/cors.middleware");
const { PORT } = require("./config/config");

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use("/api/v1/contact-requests", contactUsRoutes);
app.use("/api/v1/demo-video-requests", demoVideosRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
