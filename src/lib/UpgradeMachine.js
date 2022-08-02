import { createMachine } from "xstate"
// import { humanFileSize, shortenEthAddr, getCreator, getArweaveData } from "./utils"

const upgradeMachine = (tokenId, contractAddress, platform) => {
  let baseLink

  switch (platform) {
    case "Solana":
      baseLink = "https://explorer.solana.com/address/"
      break

    case "Ethereum":
      baseLink = "https://opensea.io/"
      break

    default:
      baseLink = ""
  }

  console.log("UPGRADE MACHINE !!!!!!")

  return createMachine({
    id: "widget",
    initial: "idle",
    states: {
      idle: {
        on: {},
      },
      no_api_key: {
        on: {},
      },
      verify_creator: {
        on: {},
      },
      not_creator: {
        on: {},
      },
      show_upgrade: {
        on: {},
      },
    },
  })
}

export default upgradeMachine
