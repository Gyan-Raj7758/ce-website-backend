const ContactUsService = require("../services/contactUs.service");

const ContactUsServiceInstance = new ContactUsService();

const postContactUs = async (req, res) => {
  const params = {
    TableName: ContactUsServiceInstance.tableName,
    Item: req.body,
  };

  try {
    await ContactUsServiceInstance.create(params);
    return res.status(200).json({ message: "Item added successfully" });
  } catch (error) {
    console.error("Error creating contact entry:", error);
    return res
      .status(500)
      .json({ message: "Error adding item", error: error.message });
  }
};

module.exports = postContactUs;
