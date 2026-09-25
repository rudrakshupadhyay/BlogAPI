import configuration from "../utils/configuration.js";

async function updatePost(
  slug,
  accessToken,
  title,
  content,
  published,
  featured,
) {
  return fetch(`${configuration.API_URL}/api/posts/${slug}`, {
    method: "PATCH",
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
}

export default updatePost;
