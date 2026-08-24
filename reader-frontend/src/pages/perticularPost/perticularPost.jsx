import getParticularPost from "../../services/perticulerPostLoader.js";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { useParams } from "react-router-dom";
import Header from "../../components/header/header.jsx";
import { Link } from "react-router";

function PerticularPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const { accessToken, refreshAccessToken } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const post = await getParticularPost({
          slug,
          accessToken,
          refreshAccessToken,
        });
        if (!post) {
          throw new Error("Post not found");
        }
        setPost(post);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return (
    <div>
      <Header />
      {error ? (
        <div>
          <div>Error: {error.message}</div>
          <Link to="/login">Login</Link>
        </div>
      ) : loading ? (
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
