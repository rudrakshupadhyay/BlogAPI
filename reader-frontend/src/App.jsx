import { useAuth } from "./context/AuthContext";
import Header from "./components/header/header";
function App() {
  const { user } = useAuth();
  return (
    <div>
      <Header />
      <div>Hello, {user ? user.name : "World"}!</div>
    </div>
  );
}

export default App;
