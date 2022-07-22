import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.Footer}>
      <span>&copy; 2022 - Qudusayo</span>
      <Link to={"/"}>Back to Home</Link>
    </div>
  );
}

export default Footer;
