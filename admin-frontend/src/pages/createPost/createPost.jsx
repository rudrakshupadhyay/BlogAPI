import Header from "../../components/header/header.jsx";
import RichTextEditor from "../../components/richTextEditor/RichTextEditor.jsx";
import Toggle from "../../components/toggle/Toggle.jsx";
import { useState, useEffect } from "react";
import styles from "./createPost.module.css";
import createPost from "../../api/createpostapi.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate, useParams } from "react-router";
import getParticularPost from "../../services/perticulerPostLoader.js";
import updatePost from "../../api/updatePostapi.js";

function CreatePostPage() {
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [title, setTitle] = useState("");
  const { accessToken, refreshAccessToken, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [loadingEditPost, setLoadingEditPost] = useState(false);
  const { slug } = useParams();
  const isEditMode = Boolean(slug);

  useEffect(() => {
    if (!isEditMode) return;
    setError(null);
    setLoadingEditPost(true);
    async function loadPost() {
      try {
        const data = await getParticularPost({
          slug,
          accessToken,
        });

        if (!data || !data.post) {
          throw new Error("Post not found");
        }

        const post = data.post;

        setTitle(post.title);
        setContent(post.content || "");
        setPublished(post.published);
        setFeatured(post.featured);
      } catch (error) {
        if (error.status === 401) {
          try {
            await refreshAccessToken();
          } catch (refreshError) {
            console.error("Session expired:", refreshError);
            setError(refreshError);
          }
          return;
        }
        console.error("Error fetching post:", error);
        setError(error);
      } finally {
        setLoadingEditPost(false);
      }
    }

    loadPost();
  }, [isEditMode, slug, accessToken, refreshAccessToken]);

  async function handleSubmit(e) {
    e.preventDefault();

    setSubmitting(true);
    setError(null);

    try {
      let response;

      if (isEditMode) {
        response = await updatePost(
          slug,
          accessToken,
          title,
          content,
          published,
          featured,
        );
      } else {
        response = await createPost(
          accessToken,
          title,
          content,
          published,
          featured,
        );
      }

      if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();

        if (isEditMode) {
          response = await updatePost(
            slug,
            newAccessToken,
            title,
            content,
            published,
            featured,
          );
        } else {
          response = await createPost(
            newAccessToken,
            title,
            content,
            published,
            featured,
          );
        }
      }

      if (!response.ok) {
        const data = await response.json();

        throw new Error(data.message || data.error || "Failed to save post");
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving post:", error);
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!user || user.role === "READER") {
    navigate("/");
  }

  if (loadingEditPost) {
    return (
      <div>
        <Header />
        <div className={styles.loading}>Loading post data...</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <h1>{isEditMode ? "Edit Post" : "Create Post"}</h1>
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
            value={title}
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
          {submitting ? "Saving..." : isEditMode ? "Update Post" : "Save"}
        </button>
      </form>
    </div>
  );
}

export default CreatePostPage;
