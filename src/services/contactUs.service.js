const { CONTACT_US_TABLE } = require("../../config/config");
const {
  checkTableExists,
  createTable,
  insertItem,
} = require("../utils/dynamoDbUtils");

class ContactUsService {
  constructor() {
    this.tableName = CONTACT_US_TABLE;
  }

  /**
   * Ensures the table exists in DynamoDB.
   * If the table does not exist, it will create the table.
   */
  async ensureTableExists() {
    const exists = await checkTableExists(this.tableName);
    if (!exists) {
      await createTable(this.tableName, {
        KeySchema: [{ AttributeName: "emailId", KeyType: "HASH" }],
        AttributeDefinitions: [
          { AttributeName: "emailId", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      });
    }
  }

  /**
   * Inserts an item into the DynamoDB table.
   * Ensures the table exists before attempting the insert.
   * @param {Object} item - The data to insert into the table.
   */
  async create(item) {
    await this.ensureTableExists();
    await insertItem(this.tableName, item);
  }
}

module.exports = ContactUsService;
