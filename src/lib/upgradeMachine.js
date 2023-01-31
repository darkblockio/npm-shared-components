import { createMachine } from "xstate"
import { getCreator, getNFTData } from "./utils"

const upgradeMachine = (tokenId, contractAddress, platform, dev = false) => {
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
              getCreator(contractAddress, tokenId, platform, dev),
              getNFTData(platform.toLowerCase().includes("solana") ? "" : contractAddress, tokenId, platform, dev),
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
          CONNECT_WALLET: { target: "wallet_connected" },
          CONNECT_FAILED: { target: "start_failure" },
        },
      },
      wallet_connected: {
        on: {
          VERIFY_OWNER: { target: "verify_owner" },
        },
      },
      verify_owner: {
        on: {
          SUCCESS: { target: "show_upgrade" },
          FAIL: { target: "start_failure" },
        },
      },
      start_failure: {
        on: {
          RETRY: { target: "idle" },
        },
      },
      show_upgrade: {
        on: {
          SIGN: { target: "signing" },
        },
      },
      signing: {
        on: {
          SIGNING_SUCCESS: { target: "upload_file" },
          SIGNING_FAIL: { target: "show_upgrade" },
        },
      },
      signing_fail: { target: "show_upgrade" },
      upload_file: {
        on: {
          RESET: { target: "verify_owner" },
          COMPLETE: { target: "upload_complete" },
        },
      },
      upload_complete: { target: "verify_owner" },
    },
  })
}

export default upgradeMachine
