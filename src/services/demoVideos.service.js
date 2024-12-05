const { DEMO_VIDEOS_TABLE } = require("../../config/config");
const {
  checkTableExists,
  createTable,
  insertItem,
} = require("../utils/dynamoDbUtils");

class DemoVideosService {
  constructor() {
    this.tableName = DEMO_VIDEOS_TABLE;
  }

  async ensureTableExists() {
    const exists = await checkTableExists(this.tableName);
    if (!exists) {
      await createTable(this.tableName);
    }
  }

  async create(params) {
    await this.ensureTableExists();
    await insertItem(this.tableName, params.Item);
  }
}

module.exports = DemoVideosService;
