import Header from "../../components/header/header.jsx";
import RichTextEditor from "../../components/richTextEditor/RichTextEditor.jsx";
import Toggle from "../../components/toggle/Toggle.jsx";
import { useState } from "react";
import styles from "./createPost.module.css";
import createPost from "../../api/createpostapi.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router";

function CreatePostPage() {
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [title, setTitle] = useState("");
  const { accessToken, refreshAccessToken, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    setSubmitting(true);
    setError(null);
    e.preventDefault();
    try {
      let response = await createPost(
        accessToken,
        title,
        content,
        published,
        featured,
      );
      if (response.status === 401) {
        await refreshAccessToken();
        response = await createPost(
          accessToken,
          title,
          content,
          published,
          featured,
        );
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || data.error || "Failed to create post");
      }
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!user || user.role === "READER") {
    navigate("/");
  }

  return (
    <div>
      <Header />
      <div className={styles.toggleContainer}>
        <div className={styles.toggleItem}>
          <span>Published</span>
          <Toggle
            checked={published}
            onChange={setPublished}
            label="Toggle published status"
          />
        </div>

        <div className={styles.toggleItem}>
          <span>Featured</span>
          <Toggle
            checked={featured}
            onChange={setFeatured}
            label="Toggle featured status"
          />
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="title" className={styles.label}>
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="content" className={styles.label}>
            Content:
          </label>
          <RichTextEditor content={content} setContent={setContent} />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button
          type="submit"
          className={styles.saveButton}
          disabled={submitting}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
