import styles from "./comments.module.css";
import { useState } from "react";

function EditComment({ comment, setEditingComment, setPost }) {
  const [commentContent, setCommentContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(event) {
    setCommentContent(event.target.value);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      // Logic to update the comment goes here
      console.log("Updating comment:", commentContent);
      setEditingComment(null);
    } catch (error) {
      console.error("Error updating comment:", error);
    } finally {
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
