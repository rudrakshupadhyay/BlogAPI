import { useAuth } from "./context/AuthContext";
import Header from "./components/header/header";
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
      <Header />
      <div>Hello, {user ? user.name : "World"}!</div>
    </div>
  );
}

export default App;
