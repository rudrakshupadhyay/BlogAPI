import configuration from "../utils/configuration.js";

function getMinePostStatisticsApi(accessToken) {
  const response = fetch(`${configuration.API_URL}/api/posts/mine/statistics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

export default getMinePostStatisticsApi;