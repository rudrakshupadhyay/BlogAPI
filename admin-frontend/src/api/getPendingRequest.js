import configuration from "../utils/configuration.js";

async function getPendingRequest(assessToken) {
  const response = await fetch(`${configuration.API_URL}/api/admin-request`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${assessToken}`,
    },
  });

  return response;
}

export default getPendingRequest;
