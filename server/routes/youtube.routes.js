const YouTubeController = require("../controllers/youtube.controller");

module.exports = (app) => {
  app.get("/api/videos/:searchQuery", YouTubeController.getVideosByKeyword);
};
