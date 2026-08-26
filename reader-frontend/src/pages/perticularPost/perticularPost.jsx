import getParticularPost from "../../services/perticulerPostLoader.js";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useParams, Link } from "react-router";
import Header from "../../components/header/header.jsx";
import styles from "./perticularPost.module.css";
import Comments from "../../components/comments/comments.jsx";

function PostUI({ post, setPost }) {
  return (
    <main className={styles.post}>
      <section className={styles.postCard}>
        <div>
          <Link to="/posts" className={styles.backLink}>
            &larr; Back to Posts
          </Link>
        </div>
        <div className={styles.postMetaData}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          <div className={styles.postDetails}>
            <div className={styles.postAuthor}>
              By:{" "}
              <span className={styles.postAuthorName}>{post.author.name}</span>
            </div>
            <div className={styles.postDate}>
              &bull; Published on:{" "}
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div
          className={styles.postContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
        <Comments comments={post.comments} post={post} setPost={setPost} />
      </section>
      <footer className={styles.postFooter}>
        <div> this is footer content</div>
      </footer>
    </main>
  );
}

function PerticularPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const { loading, accessToken, refreshAccessToken, user } = useAuth();
  const [error, setError] = useState(null);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    const fetchPost = async () => {
      setPostLoading(true);
      setError(null);
      try {
        const data = await getParticularPost({
          slug,
          accessToken,
        });
        if (!data) {
          throw new Error("Post not found");
        }
        setPost(data.post);
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
        setPostLoading(false);
      }
    };

    fetchPost();
  }, [slug, loading, accessToken, refreshAccessToken]);

  return (
    <div className={styles.pageContainer}>
      <Header />
      {error ? (
        <div>
          <div>Error: {error.message}</div>
          {!user && (
            <div>
              <p>You need to be logged in to view this post.</p>
              <Link to="/login">Go to Login</Link>
            </div>
          )}
        </div>
      ) : postLoading ? (
        <div>Loading...</div>
      ) : (
        <PostUI post={post} setPost={setPost} />
      )}
    </div>
  );
}

export default PerticularPost;
