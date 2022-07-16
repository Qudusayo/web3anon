import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import Home from "./Pages/Home/Home";
import { useContractContext } from "./Context/ContractContext";
import console from "console-browserify";
import { Route, Routes } from "react-router-dom";
import ResolveUser from "./Pages/ResolveUser";

function App() {
  const { enableWeb3, isWeb3Enabled, isAuthenticated, user } = useMoralis();
  const { getUserWithAddress } = useContractContext();
  const [registeredUsername, setRegisteredUsername] = useState("");
  const [isRegisteredUser, setIsRegisteredUser] = useState(false);

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated) {
      enableWeb3();
    }
  }, [isWeb3Enabled, isAuthenticated]);

  useEffect(() => {
    async function verifyAddress() {
      let userAddress = user.get("ethAddress");
      let response = await getUserWithAddress(userAddress);
      setRegisteredUsername(response);
      setIsRegisteredUser(!!response);
    }

    isAuthenticated && verifyAddress();
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            isRegisteredUser={isRegisteredUser}
            registeredUsername={registeredUsername}
          />
        }
      />
      <Route path="/:resolveUser" element={<ResolveUser />} />
    </Routes>
  );
}

export default App;
