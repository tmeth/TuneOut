const { DynamoDBClient, GetItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb"); // converts DynamoDB format to JS object

const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  const command = new ScanCommand({ TableName: "tune_out" });

  try {
    const response = await client.send(command);

    const playlists = response.Items.map(item => unmarshall(item));
    return {
      statusCode: 200,
      body: JSON.stringify(playlists),
    };
  } catch (err) {
    console.error("Scan failed:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to retrieve playlists" }),
    };
  }
};