import styles from "./comments.module.css";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useState } from "react";

function CreateComment() {
  // Logic to create a comment goes here
  const [commentContent, setCommentContent] = useState("");
  function handleChange(event) {
    setCommentContent(event.target.value);
  }
  function handleSubmit() {
    console.log("Submitting comment:", commentContent);
    setCommentContent("");
  }
  return (
    <div className={styles.createCommentContainer}>
      <textarea
        placeholder="Write a comment..."
        onChange={handleChange}
        value={commentContent}
      />
      <button className={styles.submitCommentButton} onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

function Comments({ comments }) {
  const [showComments, setShowComments] = useState(false);
  const [creatingComment, setCreatingComment] = useState(false);
  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentsHeader}>
        <div className={styles.commentsTitle}>
          <h3>Comments</h3>
          <FaCaretDown onClick={() => setShowComments(!showComments)} />
        </div>
        <div className={styles.commentActions}>
          <p className={styles.commentCount}>{comments.length} comments</p>
          <button
            className={styles.createCommentButton}
            onClick={() => setCreatingComment(!creatingComment)}
          >
            Create Comment
          </button>
        </div>
      </div>
      {creatingComment && <CreateComment />}
      {showComments &&
        (comments.length > 0 ? (
          <ul className={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.comment}>
                <div className={styles.commentAuthor}>
                  <div className={styles.avatar}>
                    <FaUser />
                  </div>
                  <div className={styles.authorName}>{comment.author.name}</div>
                </div>
                <p className={styles.commentContent}>{comment.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noComments}>No comments to display.</p>
        ))}
    </div>
  );
}

export default Comments;
