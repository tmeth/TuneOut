export const handler = async (event) => {
  const params = event.queryStringParameters || {};
  const playlistId = params.playlistId;

  if (!playlistId) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ message: "Missing playlistId in query string" }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: `Playlist with ID ${playlistId} deleted.` }),
  };
};
