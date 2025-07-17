const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "us-east-1" });

exports.handler = async (event) => {
  const playlistId = event?.queryStringParameters?.playlistId;

  if (!playlistId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing playlistId in query parameters" }),
    };
  }

  const params = {
    TableName: "tune_out",
    Key: {
      pk: { S: playlistId }, // You need to provide the type explicitly
    },
  };

  try {
    await client.send(new DeleteItemCommand(params));
    return {
      statusCode: 204, // No Content
      body: JSON.stringify("Item deleted successfully"),
    };
  } catch (err) {
    console.error("Error deleting item from DynamoDB", err);
    return {
      statusCode: 500,
      body: JSON.stringify("Error deleting item from DynamoDB"),
    };
  }
};