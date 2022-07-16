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
    // console.log(result);
    return result;
  };

  const getAddressForUser = async (username) => {
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
