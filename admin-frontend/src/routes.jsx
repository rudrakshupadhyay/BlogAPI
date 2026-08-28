import App from "./App";
import ErrorPage from "./components/ErrorPage";
import LoginPage from "./pages/login/login.jsx";
import RegisterPage from "./pages/register/register.jsx";
import PendingRequestPage from "./pages/pendingRequest/pendingRequest.jsx";

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
        element: <div>Welcome to the Blog App!</div>,
      },
    ],
  },
  {
    path: "/pending-requests",
    element: <PendingRequestPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
];

export default routes;
