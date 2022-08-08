import { createMachine } from "xstate"
import { getCreator, getNFTData } from "./utils/utils"

const upgradeMachine = (tokenId, contractAddress, platform) => {
  return createMachine({
    id: "widget-upgrade",
    initial: "idle",
    context: {
      contractAddress,
      creator: null,
      fileHash: null,
      nftData: null,
      platform,
      signature: null,
      tokenId,
      uploadPercent: 0,
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
      show_upgrade: {
        on: {
          SIGN: "signing",
        },
      },
      signing: {
        on: {
          SUCCESS: "upload_file",
          // FAIL: "auth_failure",
          // CANCEL: "wallet_connected",
        },
      },
      upload_file: {},
    },
  })
}

export default upgradeMachine
