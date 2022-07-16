import { createContext, useContext } from "react";
import { useMoralisWeb3Api, useMoralisWeb3ApiCall } from "react-moralis";
import abi from "./../assets/abi.json";
import console from "console-browserify";

export const ContractContext = createContext();

export function ContractProvider({ children }) {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
  const supportedChain = process.env.REACT_APP_SUPPORTED_CHAIN_ID;

  const { native } = useMoralisWeb3Api();
  const { fetch } = useMoralisWeb3ApiCall(native.runContractFunction);

  const getUserWithAddress = async (address) => {
    try {
      let result = await fetch({
        params: {
          abi,
          chain: supportedChain,
          address: contractAddress,
          function_name: "getUsernameWithAddress",
          params: {
            _address: address,
          },
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const getAddressForUser = async (username) => {
    const deadAddress = "0x0000000000000000000000000000000000000000";
    try {
      let result = await fetch({
        params: {
          abi,
          chain: supportedChain,
          address: contractAddress,
          function_name: "getAddressWithUsername",
          params: {
            _username: username,
          },
        },
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      return deadAddress;
    }
  };

  let sharedState = {
    getAddressForUser,
    getUserWithAddress,
  };

  return (
    <ContractContext.Provider value={sharedState}>
      {children}
    </ContractContext.Provider>
  );
}

export function useContractContext() {
  return useContext(ContractContext);
}
