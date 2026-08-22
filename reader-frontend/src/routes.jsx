import App from "./App";
import ErrorPage from "./components/ErrorPage";
import RegisterPage from "./pages/register/register";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <div>Login Page</div>,
    errorElement: <ErrorPage />,
  },
];

export default routes;
