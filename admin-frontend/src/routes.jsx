import App from "./App";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./pages/login/login.jsx";
import RegisterPage from "./pages/register/register.jsx";
import PendingRequestPage from "./pages/pendingRequest/pendingRequest.jsx";
import CreatePostPage from "./pages/createPost/createPost.jsx";
import Dashboard from "./pages/deshboard/deshboard.jsx";
import PostsPage from "./pages/post/posts.jsx";
import PerticularPost from "./pages/perticularPost/perticularPost";

const routes = [
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/pending-requests",
    element: <PendingRequestPage />,
  },
  {
    path: "/create-post",
    element: <CreatePostPage />,
  },
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "/post/:slug",
    element: <PerticularPost />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
