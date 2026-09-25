import styles from "./comments.module.css";
import { useState } from "react";
import editComment from "../../api/editComment.js";
import { useAuth } from "../../context/AuthContext.jsx";

function EditComment({ comment, setEditingComment, setPost }) {
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, accessToken, refreshAccessToken } = useAuth();
  function handleChange(event) {
    setCommentContent(event.target.value);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      console.log("Updating comment:", commentContent);
      let response = await editComment(comment, commentContent, accessToken);
      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        response = await editComment(comment, commentContent, newAccessToken);
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update comment");
      }
      setCommentContent("");
      // Update the post with the updated comment
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.map((c) =>
          c.id === comment.id ? { ...c, content: data.content } : c,
        ),
      }));
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
      setEditingComment(null);
      setIsSubmitting(false);
    }
  }

  return (
    <div className={styles.createCommentContainer}>
      <textarea
        placeholder="Write a comment..."
        onChange={handleChange}
        value={commentContent}
      />
      <button
        className={styles.submitCommentButton}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        Submit
      </button>
    </div>
  );
}

export default EditComment;
