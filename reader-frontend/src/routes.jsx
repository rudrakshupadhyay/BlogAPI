import App from "./App";
import ErrorPage from "./components/ErrorPage";
import RegisterPage from "./pages/register/register";
import LoginPage from "./pages/login/login";

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
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
