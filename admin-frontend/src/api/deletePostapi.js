import configuration from "../utils/configuration.js";

async function deletePost(slug, accessToken) {
  const response = await fetch(`${configuration.API_URL}/api/posts/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
}

export default deletePost;