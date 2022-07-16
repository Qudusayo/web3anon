import React from "react";
import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { ConnectButton } from "web3uikit";
import styles from "./Navbar.module.scss";

function Navbar({ isRegisteredUser, title }) {
  const { isAuthenticated } = useMoralis();

  return (
    <nav className={styles.Navbar}>
      <h3>ANON</h3>
      <div className={styles.Links}>
        {isAuthenticated && isRegisteredUser ? (
          <Link to={"/messages"}>Messages</Link>
        ) : null}
        <ConnectButton />
      </div>
    </nav>
  );
}

export default Navbar;
