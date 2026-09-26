import Header from "../../components/header/header.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import getMinePostStatisticsApi from "../../api/getMinePostStatisticsApi.js";
import styles from "./dashboard.module.css";
import getFeaturedPostApi from "../../api/getFeaturedPostApi.js";
import { Link } from "react-router";

function Dashboard() {
  const { accessToken, refreshAccessToken, user } = useAuth();

  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const [loadingFeaturedPosts, setLoadingFeaturedPosts] = useState(true);
  const [featuredPosts, setFeaturedPosts] = useState(null);
  const [featuredPostsError, setFeaturedPostsError] = useState(null);
  const [featuredPostsPage, setFeaturedPostsPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoadingStats(true);
      setError(null);

      try {
        let response = await getMinePostStatisticsApi(accessToken);

        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();
          response = await getMinePostStatisticsApi(newAccessToken);
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user's post statistics");
        }

        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching user's post statistics:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStatistics();
  }, [accessToken, refreshAccessToken]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      setLoadingFeaturedPosts(true);
      setFeaturedPostsError(null);

      try {
        let response = await getFeaturedPostApi(
          accessToken,
          featuredPostsPage,
          10,
        );

        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();

          response = await getFeaturedPostApi(
            newAccessToken,
            featuredPostsPage,
            10,
          );
        }

        if (!response.ok) {
          throw new Error("Failed to fetch featured posts");
        }

        const data = await response.json();

        setFeaturedPosts(data.posts);
        setPagination(data.pagination);
      } catch (error) {
        setFeaturedPostsError(error.message);
        console.error("Error fetching featured posts:", error);
      } finally {
        setLoadingFeaturedPosts(false);
      }
    };

    fetchFeaturedPosts();
  }, [accessToken, refreshAccessToken, featuredPostsPage]);

  return (
    <div>
      <Header />

      <div className={styles.dashboardContainer}>
        <div className={styles.dashboardContent}>
          <h1 className={styles.dashboardTitle}>My Dashboard</h1>

          {error && <p className={styles.errorMessage}>{error}</p>}

          <div className={styles.statisticsContainer}>
            <h2 className={styles.welcomeMessage}>Welcome, {user?.name}!</h2>

            {loadingStats ? (
              <p className={styles.loadingMessage}>Loading statistics...</p>
            ) : (
              <div className={styles.statistics}>
                <p>Posts: {statistics?.total || 0}</p>
                <p>Published: {statistics?.published || 0}</p>
                <p>Unpublished: {statistics?.unpublished || 0}</p>
              </div>
            )}

            <h2 className={styles.sectionTitle}>Featured Posts</h2>
            <div className={styles.recentActivityContainer}>
              {loadingFeaturedPosts ? (
                <p className={styles.loadingMessage}>
                  Loading featured posts...
                </p>
              ) : featuredPostsError ? (
                <p className={styles.errorMessage}>{featuredPostsError}</p>
              ) : featuredPosts && featuredPosts.length > 0 ? (
                <>
                  <ul className={styles.featuredPostsList}>
                    {featuredPosts.map((post) => (
                      <li key={post.id} className={styles.featuredPostItem}>
                        <div className={styles.featuredPostInfo}>
                          <h3>{post.title}</h3>

                          <span
                            className={
                              post.published
                                ? styles.publishedStatus
                                : styles.draftStatus
                            }
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                        </div>

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
                      </li>
                    ))}
                  </ul>

                  {pagination && pagination.totalPages > 1 && (
                    <div className={styles.pagination}>
                      <button
                        type="button"
                        onClick={() => setFeaturedPostsPage((prev) => prev - 1)}
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
                        onClick={() => setFeaturedPostsPage((prev) => prev + 1)}
                        disabled={!pagination.hasNextPage}
                        className={styles.paginationButton}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p>No featured posts available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
