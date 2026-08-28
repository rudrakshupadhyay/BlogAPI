import configuration from "../utils/configuration.js";

async function createAdminRequest(reason, genre, accessToken) {
  let requestBody = {
    reason: reason,
  };

  if (genre) {
    requestBody.genre = genre;
  }

  const response = await fetch(`${configuration.API_URL}/api/admin-request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });
  
  return response;
}

export default createAdminRequest;
