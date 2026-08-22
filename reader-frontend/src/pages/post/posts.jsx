import Header from "../../components/header/header";
import { useEffect, useState } from "react";

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

  function handleNext() {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <div>
      <Header />

      <main>
        <section>
          {loading ? (
            <p>Loading posts...</p>
          ) : error ? (
            <p>Error fetching posts: {error}</p>
          ) : (
            <>
              <div>
                {posts.map((post) => (
                  <div key={post.id}>
                    <h2>{post.title}</h2>

                    <div>
                      <i>{post.publishedAt}</i>
                    </div>

                    <div>By: {post.author.name}</div>
                  </div>
                ))}
              </div>

              <footer>
                <button
                  onClick={handlePrevious}
                  disabled={page === 1}
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
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={handleNext}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </footer>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default PostsPage;