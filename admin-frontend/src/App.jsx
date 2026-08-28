import { useAuth } from "./context/AuthContext.jsx";
import { Outlet, Link } from "react-router";
import AdminRequestPage from "./components/adminRequest/adminRequest.jsx";

function App() {
  const { user, loading } = useAuth();
  return (
    <div className="app">
      <main>
        {loading ? (
          <p>Loading Auth...</p>
        ) : user ? (
          user.role === "READER" ? (
            <AdminRequestPage />
          ) : (
            <Outlet />
          )
        ) : (
          <div>
            <p>Please log in to access the admin panel.</p>
            <Link to="/login">Go to Login</Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
