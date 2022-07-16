import { useState } from "react";
import styles from "./Message.module.scss";
import console from "console-browserify";

import Spinner from "./../../Component/Spinner/Spinner";

function Message({ username }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const setMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    setIsSending(true);
    console.log(message);
  };

  const transformUsername = (username) =>
    username[0].toUpperCase() + username.slice(1);

  return (
    <div className={styles.Message}>
      <div className={styles.Header}>
        <h1>Say Something...</h1>
        <h2>About {username.toUpperCase()}</h2>
      </div>
      <form className={styles.Form} onSubmit={submitFormHandler}>
        <textarea
          autoFocus={true}
          placeholder={`Leave a message for ${transformUsername(
            username
          )} here...`}
          onChange={setMessageHandler}
          value={message}
          disabled={isSending}
          minLength="10"
          required={true}
        ></textarea>
        <button disabled={isSending} type="submit">
          {isSending ? <Spinner /> : "Send Message"}
        </button>
      </form>
      <div className={styles.Hack}>
        Say what do you think about {transformUsername(username)} or Leave a
        feedback for {transformUsername(username)} anonymously using the form
        above.. 🥰 <br />
        <br />
        Thank You!! 😍😊
      </div>
    </div>
  );
}

export default Message;
