const {
  DynamoDBClient,
  DescribeTableCommand,
  CreateTableCommand,
} = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutItemCommand,
} = require("@aws-sdk/lib-dynamodb");
const { REGION } = require("../../config/config");

const client = new DynamoDBClient({ region: REGION });
const dynamoDb = DynamoDBDocumentClient.from(client);

async function checkTableExists(tableName) {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    return true;
  } catch (error) {
    if (error.name === "ResourceNotFoundException") {
      return false;
    }
    console.error("Error checking table existence:", error.message);
    throw error;
  }
}

async function createTable(tableName) {
  const createTableParams = {
    TableName: tableName,
    KeySchema: [{ AttributeName: "emailId", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "emailId", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST", // On-demand capacity
  };

  try {
    await client.send(new CreateTableCommand(createTableParams));
  } catch (error) {
    console.error("Error creating table:", error.message);
    throw error;
  }
}

async function insertItem(tableName, item) {
  const params = { TableName: tableName, Item: item };

  try {
    await dynamoDb.send(new PutItemCommand(params));
  } catch (error) {
    console.error("Error inserting item:", error.message);
    throw error;
  }
}

module.exports = { checkTableExists, createTable, insertItem };
