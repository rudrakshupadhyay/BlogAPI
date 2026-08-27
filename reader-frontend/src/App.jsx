import Header from "./components/header/header";
import HomeUI from "./pages/home/home.jsx";
import styles from "./pages/home/home.module.css";
import { useAuth } from "./context/AuthContext.jsx";
function Home() {
  const { loading } = useAuth();
  return (
    <div className={styles.pageContainer}>
      <Header />
      {loading ? <div className={styles.loading}>Loading...</div> : <HomeUI />}
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;
