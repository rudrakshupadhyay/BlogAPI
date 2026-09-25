import configuration from "../utils/configuration.js";
async function createComment(postId, content, accessToken) {
  console.log("postId in create comment", postId);
  const response = await fetch(
    `${configuration.API_URL}/api/comments/${postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content }),
    },
  );

  return response;
}

export default createComment;
