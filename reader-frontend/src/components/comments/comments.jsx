import styles from "./comments.module.css";
import { FaUser, FaCaretDown, FaEllipsisV } from "react-icons/fa";
import { useState } from "react";
import createComment from "../../api/createComment.js";
import deleteCommentApi from "../../api/deleteComment.js";
import { useAuth } from "../../context/AuthContext.jsx";
import EditComment from "./editComment.jsx";

function CommentActions({ onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleEdit() {
    setIsOpen(false);
    onEdit();
  }

  async function handleDelete() {
    setIsOpen(false);
    await onDelete();
  }

  return (
    <div className={styles.commentActionMenu}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Comment actions"
      >
        <FaEllipsisV />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button type="button" onClick={handleEdit}>
            Edit
          </button>

          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}


function CreateComment({ postId, setCreatingComment, setPost }) {
  // Logic to create a comment goes here
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, accessToken, refreshAccessToken } = useAuth();
  function handleChange(event) {
    setCommentContent(event.target.value);
  }

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      let response = await createComment(postId, commentContent, accessToken);
      if (response.status === 401) {
        const refreshedAccessToken = await refreshAccessToken();
        response = await createComment(
          postId,
          commentContent,
          refreshedAccessToken,
        );
      }
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create comment");
      }
      setCommentContent("");
      // Update the post with the new comment
      setPost((prevPost) => ({
        ...prevPost,
        comments: [
          ...prevPost.comments,
          {
            id: data.id,
            content: data.content,
            createdAt: data.createdAt,
            author: { id: user.id, name: user.name },
          },
        ],
      }));
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setCreatingComment(false);
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

function Comments({ comments, post, setPost }) {
  const [showComments, setShowComments] = useState(false);
  const [creatingComment, setCreatingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const { user, accessToken, refreshAccessToken } = useAuth();



  async function handleDeleteComment(commentId) {
    try {
      let response = await deleteCommentApi(commentId, accessToken);
      if (response.status === 401) {
        const refreshedAccessToken = await refreshAccessToken();
        response = await deleteCommentApi(commentId, refreshedAccessToken);
      }
      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }
      // Update the post by removing the deleted comment
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.filter(
          (comment) => comment.id !== commentId,
        ),
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }

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
      {creatingComment && (
        <CreateComment
          postId={post.id}
          setCreatingComment={setCreatingComment}
          setPost={setPost}
        />
      )}
      {editingComment && (
        <EditComment
          comment={editingComment}
          setEditingComment={setEditingComment}
          setPost={setPost}
        />
      )}
      {showComments &&
        (comments.length > 0 ? (
          <ul className={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} className={styles.comment}>
                <div className={styles.commentHeader}>
                  <div className={styles.commentAuthor}>
                    <div className={styles.avatar}>
                      <FaUser />
                    </div>
                    <div className={styles.authorName}>
                      {comment.author.name}
                    </div>
                  </div>
                  <div className={styles.commentActions}>
                    {user && comment.author.id === user.id && (
                      <CommentActions
                        onEdit={() => setEditingComment(comment)}
                        onDelete={() => handleDeleteComment(comment.id)}
                      />
                    )}
                  </div>
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
