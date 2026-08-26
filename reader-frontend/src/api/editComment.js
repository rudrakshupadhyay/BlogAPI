import configuration from "../utils/configuration.js";

async function editComment(comment, newContent, accessToken) {
  const response = await fetch(
    `${configuration.API_URL}/api/comments/${comment.id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ content: newContent }),
    },
  );

  return response;
}

export default editComment;