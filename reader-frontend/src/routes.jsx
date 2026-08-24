import App from "./App";
import ErrorPage from "./components/ErrorPage";
import RegisterPage from "./pages/register/register";
import LoginPage from "./pages/login/login";
import PostsPage from "./pages/post/posts";
import PerticularPost from "./pages/perticularPost/perticularPost";
import perticulerPostLoader from "./services/perticulerPostLoader.js";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
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
