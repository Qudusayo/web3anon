import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import console from "console-browserify";

import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import Navbar from "../../Component/Navbar/Navbar";
import abi from "./../../assets/abi.json";

function Home({ isRegisteredUser, registeredUsername }) {
  const { fetch } = useWeb3ExecuteFunction();
  const [username, setUsername] = useState("");
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const { isAuthenticated } = useMoralis();

  useEffect(() => {
    !!registeredUsername ? setUsername(registeredUsername) : setUsername("");
    !isAuthenticated && setUsername("");
  }, [registeredUsername, isAuthenticated]);

  const setUsernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    let params = {
      _username: username,
    };

    let options = {
      contractAddress,
      functionName: "registerName",
      abi,
      params,
    };

    fetch({
      params: options,
      onSuccess: (tx) => tx.wait().then((newTx) => console.log(newTx)),
      onError: (error) => console.log(error),
    });

    console.log(options);
  };

  const isDisabledBtn = () => {
    return (isRegisteredUser && isAuthenticated) || !isAuthenticated;
  };

  return (
    <>
      <Navbar isRegisteredUser={isRegisteredUser} />
      <div className={styles.Home}>
        <div className={styles.Info}>
          <h1>Send secret anonymous messages online</h1>
          <p>
            Create profile. Share your link. Recieve anonymous messages online.
            It's easier than you think.
          </p>
          <form className={styles.Form} onSubmit={submitFormHandler}>
            <div>
              <span>xlmn.xyz/</span>
              <input
                placeholder="yourname"
                onChange={setUsernameHandler}
                value={username}
                disabled={isRegisteredUser}
              />
            </div>
            <button
              disabled={isRegisteredUser}
              className={isDisabledBtn() ? styles.disabled : null}
            >
              Start My Page
            </button>
          </form>
          <small>It's free, and takes less than a minute.</small>
        </div>
      </div>
    </>
  );
}

export default Home;
