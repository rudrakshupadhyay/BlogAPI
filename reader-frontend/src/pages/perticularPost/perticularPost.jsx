import getParticularPost from "../../services/perticulerPostLoader.js";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useParams, Link } from "react-router";
import Header from "../../components/header/header.jsx";


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
        const post = await getParticularPost({
          slug,
          accessToken,
        });
        if (!post) {
          throw new Error("Post not found");
        }
        setPost(post);
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
    <div>
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
        <div>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
}

export default PerticularPost;
