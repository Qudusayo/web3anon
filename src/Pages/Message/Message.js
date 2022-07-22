import { useState } from "react";
import styles from "./Message.module.scss";
import console from "console-browserify";
import Swal from "sweetalert2";

import Spinner from "./../../Component/Spinner/Spinner";
import { useMoralisCloudFunction } from "react-moralis";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

function Message({ username }) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { fetch } = useMoralisCloudFunction(
    "message",
    {},
    { autoFetch: false }
  );

  const setMessageHandler = (e) => {
    setMessage(e.target.value);
  };

  const fire = (truthy) =>
    truthy
      ? Toast.fire({
          icon: "success",
          title: "Message sent successfully",
        })
      : Toast.fire({
          icon: "error",
          title: "Error sending message",
        });

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (message.length < 10) {
      return Swal.fire({
        icon: "warning",
        text: `Please lengthen the text to 10 characters or more. (You currently using ${message.length} characters)`,
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
    setIsSending(true);

    const params = {
      username,
      message,
    };
    try {
      const response = await fetch({
        params,
      });
      if (response.status) {
        setMessage("");
        fire(true);
      } else {
        fire(false);
      }
    } catch (error) {
      const code = error.code;
      const message = error.message;
      fire(false);
      console.log(code, message, error);
    }
    setIsSending(false);
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
