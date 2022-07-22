import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import console from "console-browserify";

import { useContractContext } from "./../Context/ContractContext";

import Error404 from "./Error404/Error404";
import Message from "./Message/Message";
import { useMoralis } from "react-moralis";
import Footer from "../Component/Footer/Footer";

const deadAddress = "0x0000000000000000000000000000000000000000";

function ResolveUser() {
  const { isInitialized } = useMoralis();
  const [resolvedUsername, setResolvedUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [resolving, setResolving] = useState(true);
  const { getAddressForUser } = useContractContext();

  const location = useLocation();

  useEffect(() => {
    let username = location.pathname.split("/")[1];
    setResolvedUsername(username);
    console.log(username);

    async function verifyUsername() {
      let response = await getAddressForUser(username);
      if (response === deadAddress) {
        setIsValidUsername(false);
      } else {
        setIsValidUsername(true);
      }

      setResolved(true);
      setResolving(false);
    }

    isInitialized && verifyUsername();
  }, [isInitialized]);

  return (
    <>
      {resolving && !resolved ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100vw",
            height: "100vh",
          }}
        >
          <h2>Loading!!!</h2>
        </div>
      ) : (
        <>
          <div>
            {isValidUsername ? (
              <>
                <Message username={resolvedUsername} />
                <Footer />
              </>
            ) : null}
            {!isValidUsername ? <Error404 username={resolvedUsername} /> : null}
          </div>
        </>
      )}
    </>
  );
}

export default ResolveUser;
