import { createMachine } from "xstate";
import {
  humanFileSize,
  shortenEthAddr,
  getOwner,
  getCreator,
  getArweaveData,
} from "./utils";

const widgetMachine = (tokenId, contractAddress, platform) => {
  let baseLink;

  switch (platform) {
    case "Solana":
      baseLink = "https://explorer.solana.com/address/";
      break;

    case "Ethereum":
      baseLink = "https://opensea.io/";
      break;

    default:
      baseLink = "";
  }

  return createMachine({
    id: "widget",
    initial: "idle",
    context: {
      owner: null,
      creator: null,
      arweaveData: null,
      artId: null,
      display: {
        owner: "",
        ownerLink: "",
        creator: "",
        creatorLink: "",
        fileFormat: "",
        fileSize: "",
        arweaveTX: "",
        arweaveTXLink: "",
        details: "",
      },
      baseLink,
      tokenId,
      contractAddress,
      platform,
    },
    states: {
      idle: {
        on: {
          FETCH_ARWEAVE: {
            target: "loading_arweave",
          },
        },
      },
      loading_arweave: {
        invoke: {
          src: () =>
            Promise.all([
              getOwner(contractAddress, tokenId, platform),
              getCreator(contractAddress, tokenId, platform),
              getArweaveData(
                platform === "Ethereum"
                  ? contractAddress + ":" + tokenId
                  : tokenId,
                platform
              ),
            ]),
          onDone: [
            {
              target: "started",
              cond: (context, event) => {
                context.owner = event.data[0];
                context.creator = event.data[1];
                context.arweaveData = event.data[2];

                if (
                  !!context.arweaveData.darkblock &&
                  context.arweaveData.darkblock.tags
                ) {
                  context.arweaveData.darkblock.tags.forEach((tag) => {
                    if (tag.name === "ArtId") context.artId = tag.value;
                    if (tag.name === "Description")
                      context.display.details = tag.value;
                  });
                }

                if (
                  !!context.owner.owner_address &&
                  !!context.creator.creator_address &&
                  !!context.artId &&
                  context.arweaveData.status !== "Not found" &&
                  context.arweaveData.status !== "Not Verified"
                ) {
                  context.display.owner =
                    shortenEthAddr(context.owner.owner_address, platform) || "";
                  context.display.ownerLink =
                    context.baseLink + context.owner.owner_address;
                  context.display.creator =
                    shortenEthAddr(context.creator.creator_address, platform) ||
                    "";
                  context.display.creatorLink =
                    context.baseLink + context.creator.creator_address;
                  context.display.fileFormat =
                    context.arweaveData.darkblock.data.type || "";
                  context.display.fileSize =
                    humanFileSize(context.arweaveData.darkblock.data.size) ||
                    "";
                  context.display.arweaveTX =
                    context.arweaveData.darkblock.id || "";
                  context.display.arweaveTXLink = `https://viewblock.io/arweave/tx/${context.display.arweaveTX}`;

                  return true;
                } else {
                  return false;
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
        },
      },
      start_failure: {
        on: {
          RETRY: "idle",
        },
      },
      wallet_connected: {
        on: {
          SIGN: "signing",
          DISCONNECT_WALLET: "started",
        },
      },
      no_wallet_connected: {
        type: "final",
      },
      authenticated: {
        on: {
          DECRYPT: "decrypting",
          DISCONNECT_WALLET: "started",
        },
      },
      auth_failure: {
        on: {
          SIGN: "signing",
        },
      },
      decrypting: {
        on: {
          SUCCESS: "display",
          REJECT: "decrypt_error",
          DISCONNECT_WALLET: "started",
        },
      },
      decrypt_error: {},
      signing: {
        on: {
          SUCCESS: "authenticated",
          FAIL: "auth_failure",
          CANCEL: "wallet_connected",
        },
      },
      display: {
        on: {
          DISCONNECT_WALLET: "started",
        },
      },
    },
  });
};

export default widgetMachine;
