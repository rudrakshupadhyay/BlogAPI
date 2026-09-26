import configuration from "../utils/configuration";

export default async function getFeaturedPostApi(
  accessToken,
  page = 1,
  limit = 10,
) {
  const response = await fetch(
    `${configuration.API_URL}/api/posts/mine/featured?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response;
}
