import configuration from "../utils/configuration.js";

async function createPost(accessToken, title, content, published, featured) {
  const response = await fetch(`${configuration.API_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      title,
      content,
      published,
      featured,
    }),
  });

  return response;
}

export default createPost;
