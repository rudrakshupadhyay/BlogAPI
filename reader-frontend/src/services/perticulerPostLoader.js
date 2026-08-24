import configuration from "../utils/configuration.js";

async function getParticularPost({ slug, accessToken, refreshAccessToken }) {
  try {
    const response = await fetch(`${configuration.API_URL}/api/posts/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.ok) {
      return await response.json();
    }

    if (response.status !== 401) {
      const error = await response.json();

      throw new Error(error.message || "Unable to fetch post");
    }

    const refreshedToken = await refreshAccessToken();

    const retryResponse = await fetch(
      `${configuration.API_URL}/api/posts/${slug}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${refreshedToken}`,
        },
      },
    );

    const retryPost = await retryResponse.json();

    if (!retryResponse.ok) {
      throw new Error(retryPost.message || "Unable to fetch post");
    }

    return retryPost;
  } catch (err) {
    console.error("Error fetching post:", err);
    throw err;
  }
}

export default getParticularPost;
