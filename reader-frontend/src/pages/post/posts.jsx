import Header from "../../components/header/header";
import { useEffect, useState } from "react";
import styles from "./posts.module.css";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `http://localhost:3000/api/posts?page=${page}&limit=10`,
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
  }, [page]);

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

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.postsSection}>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error fetching posts: {error}</p>
          ) : (
            <div className={styles.innerMain}>
              <div className={styles.postsContainer}>
                {posts.map((post) => (
                  <div key={post.id} className={styles.post} onClick={() => handlePostClick(post.id)}>
                    <div className={styles.postTitle}><b>Title:</b> {post.title}</div>
                    <div>
                      <div>
                        <i>
                          {" "}
                          {new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </i>
                      </div>
                      <div>By: {post.author.name}</div>
                    </div>
                  </div>
                ))}
              </div>

              <footer className={styles.pagination}>
                <button onClick={handlePrevious} disabled={page === 1} className={styles.paginationButton}>
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

                <button onClick={handleNext} disabled={page === totalPages} className={styles.paginationButton}>
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
