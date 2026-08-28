import App from "./App";
import ErrorPage from "./components/ErrorPage";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]

export default routes;