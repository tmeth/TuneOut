const BASE_URL = 'https://kx6su1w0sa.execute-api.us-east-1.amazonaws.com';

export async function deletePlaylist(playlistId) {
  const response = await fetch(`${BASE_URL}/deletePlaylist?playlistId=${playlistId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete playlist');
  return response.json();
}
