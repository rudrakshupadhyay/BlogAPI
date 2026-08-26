import { Link } from "react-router";
import styles from "./home.module.css";

function HomeUI() {
  return (
    <main className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Writely</h1>

          <p>Discover articles, ideas, and stories written by our authors.</p>

          <Link to="/posts" className={styles.postsButton}>
            Explore Posts
          </Link>
        </div>
      </section>

      <section className={styles.about}>
        <h2>Read. Learn. Write.</h2>

        <p>
          Writely is a simple blogging platform where authors can share their
          thoughts and readers can discover new ideas.
        </p>
      </section>
    </main>
  );
}

export default HomeUI;
