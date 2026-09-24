import Header from "../../components/header/header.jsx";
import RichTextEditor from "../../components/richTextEditor/RichTextEditor.jsx";
import Toggle from "../../components/toggle/Toggle.jsx";
import { useState } from "react";
import styles from "./createPost.module.css";

function CreatePostPage() {
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);

  return (
    <div>
      <Header />
      <div className={styles.toggleContainer}>
        <div className={styles.toggleItem}>
          <span>Published</span>
          <Toggle
            checked={published}
            onChange={setPublished}
            label="Toggle published status"
          />
        </div>

        <div className={styles.toggleItem}>
          <span>Featured</span>
          <Toggle
            checked={featured}
            onChange={setFeatured}
            label="Toggle featured status"
          />
        </div>
        <div className={styles.toggleItem}>
            <button type="submit" className={styles.saveButton}>Save</button>
        </div>
      </div>
      <RichTextEditor />
    </div>
  );
}

export default CreatePostPage;
