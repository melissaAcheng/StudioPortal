const axios = require("axios");

const apiKey = process.env.API_KEY;
const baseApiUrl = "https://www.googleapis.com/youtube/v3";

module.exports = {
  getVideosByKeyword: async (req, res) => {
    try {
      console.log(req.params.searchQuery);

      const searchQuery = req.params.searchQuery;
      const url = `${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`;
      const response = await axios.get(url);
      // const titles = response.data.items.map((item) => item.snippet.title);
      // const ids = response.data.items.map((item) => item.id.videoId);
      res.send(response.data.items);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  },
};
