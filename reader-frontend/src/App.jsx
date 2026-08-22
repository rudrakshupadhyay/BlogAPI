import { useAuth } from "./context/AuthContext";
function App() {
  const { user, logout } = useAuth();
  function handleLogout() {
    try {
      logout();
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
  }
  return (
    <div>
      <div>Hello, {user ? user.name : "World"}!</div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default App;
