require("dotenv").config({ path: ".env.local" });
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: process.env.MUMBAI_API_URI,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
