import Header from "./components/header/header";
import HomeUI from "./pages/home/home.jsx";
import styles from "./pages/home/home.module.css";

function Home() {
  return (
    <div className={styles.pageContainer}>
      <Header />
      <HomeUI />
    </div>
  );
}

function App() {
  return <Home />;
}

export default App;
