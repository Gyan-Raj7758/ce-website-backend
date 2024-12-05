const DemoVideosService = require("../services/demoVideos.service");

const DemoVideosServiceInstance = new DemoVideosService();

const postDemoVideos = async (req, res) => {
  const params = {
    TableName: DemoVideosServiceInstance.tableName,
    Item: req.body,
  };

  try {
    await DemoVideosServiceInstance.create(params);
    return res
      .status(200)
      .json({ message: "Demo video item added successfully" });
  } catch (error) {
    console.error("Error adding demo video entry:", error);
    return res
      .status(500)
      .json({ message: "Error adding item", error: error.message });
  }
};

module.exports = postDemoVideos;
