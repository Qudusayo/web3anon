import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import console from "console-browserify";

import { useContractContext } from "./../Context/ContractContext";

import Error404 from "./Error404/Error404";
import Message from "./Message/Message";
import { Loading } from "web3uikit";

const deadAddress = "0x0000000000000000000000000000000000000000";

function ResolveUser() {
  const [resolvedUsername, setResolvedUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);
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
      
      setResolving(false);
    }

    verifyUsername();
  }, []);

  return (
    <>
      {resolving ? (
        <div>
          <h2>Loading</h2>
          <h2>Loading</h2>
          <h2>Loading</h2>
        </div>
      ) : (
        <>
          <div>
            {isValidUsername && !resolving ? (
              <Message username={resolvedUsername} />
            ) : null}
            {!isValidUsername && !resolving ? (
              <Error404 username={resolvedUsername} />
            ) : null}
          </div>
        </>
      )}
    </>
  );
}

export default ResolveUser;
