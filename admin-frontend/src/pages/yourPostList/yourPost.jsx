import { useAuth } from "../../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import getMinePosts from "../../api/getminePostapi.js";
import Header from "../../components/header/header.jsx";
import { Link } from "react-router";
import styles from "./yourPost.module.css";

function YourPost() {
  const { accessToken, refreshAccessToken, user } = useAuth();

  const [seePublished, setSeePublished] = useState(true);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const status = seePublished ? "published" : "unpublished";

  useEffect(() => {
    if (!user) return;

    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        let response = await getMinePosts(accessToken, page, 10, status);

        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();

          response = await getMinePosts(newAccessToken, page, 10, status);
        }

        if (!response.ok) {
          const data = await response.json();

          throw new Error(data.message || "Failed to fetch your posts");
        }

        const data = await response.json();
        console.log("Fetched your posts:", data.posts);
        setPosts(data.posts);
        setPagination(data.pagination);
      } catch (error) {
        console.error("Error fetching your posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [user, accessToken, page, status, refreshAccessToken]);

  function handlePublishedClick() {
    setSeePublished(true);
    setPage(1);
  }

  function handleUnpublishedClick() {
    setSeePublished(false);
    setPage(1);
  }

  if (!user) {
    return (
      <div className={styles.pageContainer}>
        <Header />

        <div className={styles.message}>
          <p>Please log in to view your posts.</p>
          <Link to="/login" className={styles.loginLink}>
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.heading}>Your Posts</h1>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${seePublished ? styles.activeTab : ""}`}
            onClick={handlePublishedClick}
          >
            Published
          </button>

          <button
            type="button"
            className={`${styles.tab} ${!seePublished ? styles.activeTab : ""}`}
            onClick={handleUnpublishedClick}
          >
            Unpublished
          </button>
        </div>

        {loading && <p className={styles.loading}>Loading posts...</p>}

        {error && <p className={styles.error}>{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className={styles.empty}>No {status} posts found.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <>
            <div className={styles.postList}>
              {posts.map((post) => (
                <article key={post.id} className={styles.postCard}>
                  <div className={styles.postInfo}>
                    <h2 className={styles.postTitle}>{post.title}</h2>

                    <p className={styles.postDate}>
                      Last updated:{" "}
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className={styles.actions}>
                    <Link
                      to={`/post/${post.slug}`}
                      className={styles.viewLink}
                    >
                      View
                    </Link>

                    <Link
                      to={`/posts/${post.slug}/edit`}
                      className={styles.editLink}
                    >
                      Edit
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {pagination && pagination.totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  onClick={() => setPage((prev) => prev - 1)}
                  disabled={!pagination.hasPreviousPage}
                  className={styles.paginationButton}
                >
                  Previous
                </button>

                <span className={styles.pageInfo}>
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={!pagination.hasNextPage}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default YourPost;
