import React from "react";
import styles from "./Spinner.module.scss";

export default function Spinner() {
  return (
    <div className={styles.Spinner}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
}
