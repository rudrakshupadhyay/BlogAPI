import configuration from "../utils/configuration";

async function getMinePosts(accessToken, page = 1, limit = 10, status) {
  const response = await fetch(
    `${configuration.API_URL}/api/posts/mine?page=${page}&limit=${limit}&status=${status}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
}

export default getMinePosts;
