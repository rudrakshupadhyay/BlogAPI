import styles from "./comments.module.css";
import { FaUser, FaCaretDown } from "react-icons/fa";
import { useState } from "react";
function Comments({ comments }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentsHeader}>
        <div className={styles.commentsTitle}>
          <h3>Comments</h3>
          <FaCaretDown onClick={() => setShowComments(!showComments)} />
        </div>
        <p className={styles.commentCount}>{comments.length} comments</p>
      </div>
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
