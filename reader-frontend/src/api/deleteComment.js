import configuration from "../utils/configuration.js";

async function deleteCommentApi(commentId, accessToken) {
  const response = await fetch(`${configuration.API_URL}/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`,
    },
  });

  return response;
}

export default deleteCommentApi;