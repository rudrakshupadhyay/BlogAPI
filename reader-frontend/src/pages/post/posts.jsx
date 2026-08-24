import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import styles from "./posts.module.css";
import configuration from "../../utils/configuration.js";
import SearchBar from "../../components/searchBar/searchBar.jsx";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams({
          page,
          limit: 10,
        });

        if (searchQuery.trim()) {
          queryParams.append("search", searchQuery);
        }

        const response = await fetch(
          `${configuration.API_URL}/api/posts?${queryParams.toString()}`,
          {
            method: "GET",
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch posts");
        }

        setPosts(data.posts);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [page, searchQuery]);

  function handlePrevious() {
    setPage((prevPage) => prevPage - 1);
  }

  function handlePostClick(postId) {
    // Navigate to the post detail page
    console.log(`Navigating to post with ID: ${postId}`);
  }

  function handleNext() {
    setPage((prevPage) => prevPage + 1);
  }

  function handleSearch(query) {
    setSearchQuery(query);
    setPage(1); // Reset to the first page when a new search is performed
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <SearchBar handleSearch={handleSearch} />
        <section className={styles.postsSection}>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error fetching posts: {error}</p>
          ) : (
            <div className={styles.innerMain}>
              <div className={styles.postsContainer}>
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className={styles.post}
                    onClick={() => handlePostClick(post.id)}
                  >
                    <div className={styles.postTitle}>{post.title}</div>
                    <div className={styles.metaInfo}>
                      <div>
                        {" "}
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </div>
                      <div>{post.author.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              <footer className={styles.pagination}>
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>

                {Array.from({ length: totalPages }, (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      disabled={page === pageNumber}
                      className={styles.paginationButtonNumber}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </footer>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default PostsPage;
