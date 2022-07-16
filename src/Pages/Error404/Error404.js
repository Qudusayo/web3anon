import React from "react";
import { Link } from "react-router-dom";

import styles from "./Error404.module.scss";

function index({ username }) {
  return (
    <div id={styles.notfound}>
      <div className={styles.notfound}>
        <div className={styles.notfound404}></div>
        <h1>404</h1>
        <h2>
          {username
            ? `There is no one with the username ${username}`
            : "Oops! Page Not Be Found"}
        </h2>
        <p>
          {username
            ? "Try looking for any possible typos, or you can get started by registering with the username geekyahmed right now."
            : "Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable"}
        </p>
        <Link to="/">Back to homepage</Link>
      </div>
    </div>
  );
}

export default index;
