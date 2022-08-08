import { createMachine } from "xstate"
import { getCreator, getNFTData } from "./utils/utils"

const upgradeMachine = (tokenId, contractAddress, platform) => {
  return createMachine({
    id: "widget-upgrade",
    initial: "idle",
    context: {
      creator: null,
      nftData: null,
      artId: null,
      display: {
        blockchain: "",
        creator: "",
      },
      tokenId,
      contractAddress,
      platform,
    },
    states: {
      no_wallet: {},
      no_apiKey: {},
      idle: {
        on: {
          NO_WALLET: { target: "no_wallet" },
          NO_APIKEY: { target: "no_apiKey" },
          FETCH_CREATOR: {
            target: "loading_creator",
          },
        },
      },
      loading_creator: {
        invoke: {
          src: () =>
            Promise.all([
              getCreator(contractAddress, tokenId, platform),
              getNFTData(platform === "Solana" ? "" : contractAddress, tokenId, platform),
            ]),
          onDone: [
            {
              target: "started",
              cond: (context, event) => {
                context.creator = event.data[0]
                context.nftData = event.data[1]

                if (!!context.creator.creator_address && !!context.nftData) {
                  context.display.creator = context.creator.creator_address
                  context.display.blockchain = context.nftData.nftData
                  return true
                } else {
                  return false
                }
              },
            },
            { target: "start_failure" },
          ],
          onError: { target: "start_failure" },
        },
      },
      started: {
        on: {
          CONNECT_WALLET: "wallet_connected",
          CONNECT_FAILED: "start_failure",
        },
      },
      wallet_connected: {
        on: {
          VERIFY_OWNER: "verify_owner",
        },
      },
      verify_owner: {
        on: {
          SUCCESS: "show_upgrade",
          FAIL: "start_failure",
        },
      },
      start_failure: {
        on: {
          RETRY: "idle",
        },
      },
      show_upgrade: {},
    },
  })
}

export default upgradeMachine
