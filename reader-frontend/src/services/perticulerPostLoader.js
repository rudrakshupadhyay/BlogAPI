import configuration from "../utils/configuration.js";

async function getParticularPost({ slug, accessToken }) {
  try {
    const response = await fetch(`${configuration.API_URL}/api/posts/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || "Failed to fetch post");
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Error fetching post:", err);
    throw err;
  }
}

export default getParticularPost;
