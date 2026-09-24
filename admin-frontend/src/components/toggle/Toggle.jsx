import styles from "./Toggle.module.css";

function Toggle({ checked, onChange, label }) {
  function handleClick() {
    onChange(!checked);
  }

  return (
    <button
      type="button"
      className={`${styles.toggle} ${checked ? styles.active : ""}`}
      onClick={handleClick}
      aria-pressed={checked}
      aria-label={label}
    >
      <span className={styles.thumb}></span>
    </button>
  );
}

export default Toggle;