import configuration from "../utils/configuration.js";

async function updateAdminRequest(accessToken, requestId, status) {
  const response = await fetch(
    `${configuration.API_URL}/api/admin-request/${requestId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        status,
      }),
    },
  );

  return response;
}

export default updateAdminRequest;